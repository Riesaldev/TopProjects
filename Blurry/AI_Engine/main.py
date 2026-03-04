from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import math

app = FastAPI(title="Blurry AI Engine", description="Microservicio de IA para Matching y Moderación")

# --- Modelos de Datos ---
class UserProfile(BaseModel):
    id: str
    age: int
    interests: List[str]
    location: dict # {"lat": float, "lon": float}

class MatchingRequest(BaseModel):
    user_a: UserProfile
    user_b: UserProfile
    weights: dict = {"age": 30, "distance": 20, "interests": 50}

class ChatMessage(BaseModel):
    user_id: str
    content: str
    context_type: str = "text" # "text" or "video-audio-transcript"

class ModerationResult(BaseModel):
    is_safe: bool
    confidence: float
    flagged_categories: List[str]
    suggested_action: str

# --- Endpoints de Matching ---

def calculate_distance(loc1, loc2):
    """Calcula distancia grosera (en km aprox) basada en coordenadas (Euclediana simple para MVP)"""
    lat_diff = loc1.get("lat", 0) - loc2.get("lat", 0)
    lon_diff = loc1.get("lon", 0) - loc2.get("lon", 0)
    return math.sqrt(lat_diff**2 + lon_diff**2) * 111 # 1 grado ~= 111km

@app.post("/api/v1/matching/score")
async def calculate_compatibility_score(req: MatchingRequest):
    """
    Calcula el Score de Compatibilidad (0 a 100) basándose en los pesos definidos
    por el administrador.
    """
    try:
        # 1. Score por Intereses (Jaccard Index o superposición)
        set_a = set([i.lower() for i in req.user_a.interests])
        set_b = set([i.lower() for i in req.user_b.interests])
        intersection = len(set_a.intersection(set_b))
        union = len(set_a.union(set_b))
        
        # Intereses score (0-100)
        interest_score = (intersection / union * 100) if union > 0 else 0

        # 2. Score por Edad (Campana que decae mientras mayor es la diferencia)
        age_diff = abs(req.user_a.age - req.user_b.age)
        # Si la diferencia es 0, score 100. Si es > 15 años, score casi 0.
        age_score = max(0, 100 - (age_diff * 6.5))

        # 3. Score por Distancia
        dist = calculate_distance(req.user_a.location, req.user_b.location)
        # Si dist es 0km, score 100. Restar 1pto por cada 5km. Minimo 0.
        distance_score = max(0, 100 - (dist / 5))

        # --- Cálculo ponderado (usando los `weights` de la request) ---
        w_int = req.weights.get("interests", 50) / 100
        w_age = req.weights.get("age", 30) / 100
        w_dist = req.weights.get("distance", 20) / 100

        final_score = (interest_score * w_int) + (age_score * w_age) + (distance_score * w_dist)

        return {
            "score": round(final_score, 1),
            "details": {
                "interest_match": round(interest_score, 1),
                "age_affinity": round(age_score, 1),
                "distance_proximity": round(distance_score, 1)
            }
        }
    except Exception as e:
        raise HTTPException(status_status_code=500, detail=str(e))

# --- Endpoints de Moderación (NLP Dummy MVP) ---

@app.post("/api/v1/moderation/check", response_model=ModerationResult)
async def check_content(msg: ChatMessage):
    """
    Analiza un mensaje de texto (o transcripción) y decide si rompe las reglas.
    Para el MVP se usa una lista negra de palabras. En producción usaría embeddings.
    """
    toxicity_keywords = ["insulto", "odio", "mata", "muere", "acoso", "spam_link"]
    content_lower = msg.content.lower()
    
    flagged = []
    for word in toxicity_keywords:
        if word in content_lower:
            flagged.append(word)
            
    is_safe = len(flagged) == 0
    confidence = 0.95 if not is_safe else 0.85
    action = "none" if is_safe else "shadowban" if len(flagged) > 1 else "flag_for_review"

    return ModerationResult(
        is_safe=is_safe,
        confidence=confidence,
        flagged_categories=flagged,
        suggested_action=action
    )

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "1.0.0"}
