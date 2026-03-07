"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthContext";
import { User } from "@/types";
import ViewState from "@/components/ViewState";
import { X, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Imagen from "next/image";

export default function DiscoverPage() {
  const { user: currentUser, isLoading } = useAuth();
  const [profiles, setProfiles] = useState<User[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  useEffect(() => {
    if (isLoading || !currentUser) return;
    
    // Call the matching engine recommendations
    fetch(`/api/matches/recommendations/${currentUser.id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
        }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProfiles(data);
        } else if (data.data && Array.isArray(data.data)) {
          setProfiles(data.data);
        }
      })
      .catch((e) => console.error("Error fetching candidates:", e))
      .finally(() => setLoadingProfiles(false));
  }, [currentUser, isLoading]);

  const currentProfile = profiles[currentIndex];
  
  // Recopilar fotos para mostrar
  const getProfilePhotos = (p: User) => {
    if (!p) return [];
    if (p.photos && Array.isArray(p.photos) && p.photos.length > 0) return p.photos;
    if (p.imagen_perfil || p.avatar) return [p.imagen_perfil || p.avatar];
    return ["/placeholder.jpg"];
  };

  const currentPhotos = getProfilePhotos(currentProfile as User);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex < currentPhotos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    }
  };

  const handleSwipe = async (dir: "left" | "right" | "superlike") => {
    if (!currentUser || !currentProfile) return;

    try {
      const actionMap = {
        "left": "dislike",
        "right": "like",
        "superlike": "superlike"
      };

      const action = actionMap[dir];

      const res = await fetch("/api/matches/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
        },
        body: JSON.stringify({
          userIdA: currentUser.id,
          userIdB: currentProfile.id,
          action
        })
      });

      const data = await res.json();
      
      if (data.matched) {
        // Here we could trigger a big "It's a Match!" modal
        alert(`¡It's a Match con ${currentProfile.nombre}!`);
      }
    } catch (e) {
      console.error("Error on swipe", e);
    }

    setCurrentIndex((prev) => prev + 1);
    setPhotoIndex(0);
  };

  if (isLoading || loadingProfiles) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <ViewState variant="loading" title="Buscando conexiones..." description="Analizando los algoritmos de compatibilidad." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-zinc-950 text-slate-200">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-zinc-950 to-zinc-950 -z-10" />
      
      <div className="text-center mb-8 relative z-10 w-full max-w-md flex justify-between items-center px-4">
        <h1 className="text-2xl font-black bg-gradient-to-r from-primary-400 to-accent-500 bg-clip-text text-transparent tracking-tight">
          Discover
        </h1>
        <div className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-lg">
          <span className="text-primary-400 font-bold">{currentUser?.tokens || 0}</span>
          <span className="text-zinc-500 text-xs uppercase font-black tracking-widest">TKN</span>
        </div>
      </div>

      <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000 z-10">
        <AnimatePresence>
          {currentProfile ? (
            <motion.div
              key={currentProfile.id}
              className="absolute inset-0 bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-full h-full relative group">
                <Imagen
                  src={currentPhotos[photoIndex] as string}
                  alt={currentProfile.nombre || "Profile"}
                  fill
                  style={{ objectFit: "cover" }}
                  className="pointer-events-none"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                {/* Photo Tappers */}
                {currentPhotos.length > 1 && (
                  <>
                    <div className="absolute top-0 left-0 w-1/2 h-full z-10 cursor-pointer" onClick={handlePrevPhoto} />
                    <div className="absolute top-0 right-0 w-1/2 h-full z-10 cursor-pointer" onClick={handleNextPhoto} />
                    <div className="absolute top-4 left-0 w-full flex justify-center gap-1 px-4 z-20 pointer-events-none">
                      {currentPhotos.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full ${i === photoIndex ? "bg-white" : "bg-white/30"}`} />
                      ))}
                    </div>
                  </>
                )}

                {/* Profile Info */}
                <div className="absolute bottom-0 left-0 w-full p-6 pb-24 z-20 pointer-events-none flex flex-col justify-end h-1/2">
                  <h2 className="text-3xl font-black text-white drop-shadow-md">
                    {currentProfile.nombre || currentProfile.display_name}
                    {currentProfile.edad && <span className="font-light text-zinc-300 ml-2">{currentProfile.edad}</span>}
                  </h2>
                  <div className="flex gap-2 items-center text-sm font-bold text-primary-300 mt-2 tracking-widest uppercase mb-3">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    {(currentProfile as any).location || "Unknown Layer"}
                  </div>
                  {currentProfile.bio && (
                    <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                      {currentProfile.bio}
                    </p>
                  )}
                  {currentProfile.interests && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {currentProfile.interests.split(",").slice(0,3).map(i => (
                        <span key={i} className="text-[10px] uppercase tracking-wider bg-zinc-800/80 border border-zinc-700 backdrop-blur-md px-2 py-1 rounded-md text-zinc-300">{i.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] text-center"
            >
              <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-dashed border-zinc-600 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-500/20 blur-md rounded-full animate-pulse" />
                <span className="text-3xl relative z-10 opacity-50">📡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">No More Signals</h3>
              <p className="text-zinc-500 text-sm">Expand your search radius or come back later to decrypt new identities.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Actions */}
        {currentProfile && (
          <div className="absolute -bottom-6 left-0 w-full flex justify-center gap-6 z-30 pointer-events-none">
            <button 
              onClick={() => handleSwipe("left")}
              className="pointer-events-auto w-16 h-16 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 hover:border-red-500/50 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-500 transition-all group shadow-xl"
            >
              <X className="w-8 h-8 group-hover:scale-110 transition-transform" strokeWidth={3} />
            </button>
            <button 
              onClick={() => handleSwipe("superlike")}
              className="pointer-events-auto w-14 h-14 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-blue-500/50 rounded-full flex items-center justify-center text-blue-400 transition-all group self-end mb-2 shadow-lg hover:shadow-blue-500/20"
            >
              <Star className="w-6 h-6 group-hover:scale-110 group-hover:rotate-12 transition-transform" strokeWidth={2.5} fill="currentColor" />
            </button>
            <button 
              onClick={() => handleSwipe("right")}
              className="pointer-events-auto w-16 h-16 bg-gradient-to-tr from-primary-600 to-accent-500 hover:from-primary-500 hover:to-accent-400 rounded-full flex items-center justify-center text-white transition-all group shadow-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <Heart className="w-8 h-8 group-hover:scale-110 group-active:scale-95 transition-transform" strokeWidth={3} fill="currentColor" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
