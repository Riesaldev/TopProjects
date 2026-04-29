import { useState, useEffect } from 'react'
import { tradeService } from './services/api'
import { Activity, Wallet, Award, BarChart3 } from 'lucide-react' // Cambiamos TrendingUp por BarChart3 si quieres usarlo, o lo borramos

// --- INTERFACES PARA TIPIFICADO ESTRICTO ---
interface UserSummary {
    username: string
    balance: number
    consistency: number
    xp: number
    level: number
}

interface UserPerformance {
    totalTrades: number
    winRate: string
    totalPnL: string
    tradesSinStop: number
}

interface UserData {
    summary: UserSummary
    performance: UserPerformance
    aiFeedback?: string
}

const USER_ID = 'TU_ID_DE_USUARIO_AQUI' // ID generado por el seed.ts

const App: React.FC = () => {
    // Inicializamos con el tipo UserData o null
    const [userData, setUserData] = useState<UserData | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await tradeService.getUserStats(USER_ID)
                setUserData(data)
                // 6ta Ley: Debugging de hidratación de interfaz
                console.log('[6ta Ley]: Estado de la cuenta actualizado', data)
            } catch (error) {
                console.error('[6ta Ley]: Fallo en la carga de estadísticas', error)
            }
        }
        fetchUserData()
    }, [])

    return (
        <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* HEADER */}
            <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <Activity className="text-blue-500" />
                    <span className="font-bold text-xl tracking-tight uppercase">
                        Ninja<span className="text-blue-500">Trader</span>
                    </span>
                </div>

                <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                        <Wallet size={14} className="text-emerald-400" />
                        <span className="text-sm font-mono tracking-tighter">
                            {userData?.summary?.balance.toLocaleString() || '0'}€
                        </span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                        <Award size={14} className="text-yellow-400" />
                        <span className="text-sm font-bold uppercase">
                            Nvl {userData?.summary?.level || 1}
                        </span>
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main className="flex-1 flex overflow-hidden">
                {/* GRÁFICO (Placeholder) */}
                <section className="flex-1 relative bg-black">
                    <div className="absolute top-4 left-4 z-10 bg-slate-900/90 p-3 rounded border border-slate-700 flex items-center gap-3">
                        <BarChart3 size={16} className="text-blue-400" />
                        <div>
                            <h2 className="text-[10px] uppercase text-slate-500 leading-none">
                                Instrumento
                            </h2>
                            <p className="text-sm font-bold font-mono">NAS100 / USD</p>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                        <div className="animate-pulse flex space-x-2">
                            <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
                            <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
                            <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
                        </div>
                        <p className="text-slate-600 text-xs font-mono uppercase tracking-widest">
                            Esperando Engine...
                        </p>
                    </div>
                </section>

                {/* SIDEBAR */}
                <aside className="w-80 border-l border-slate-800 bg-slate-900/90 flex flex-col">
                    <div className="p-6 border-b border-slate-800 bg-slate-900">
                        <h3 className="text-[10px] font-black mb-4 text-slate-500 uppercase tracking-[0.2em]">
                            Ejecución Express
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="bg-emerald-600/90 hover:bg-emerald-500 text-white py-4 rounded text-xs font-black transition-all active:scale-95 border-b-4 border-emerald-800">
                                MARKET BUY
                            </button>
                            <button className="bg-rose-600/90 hover:bg-rose-500 text-white py-4 rounded text-xs font-black transition-all active:scale-95 border-b-4 border-rose-800">
                                MARKET SELL
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                        <div>
                            <h3 className="text-[10px] font-black mb-3 text-slate-500 uppercase tracking-[0.2em]">
                                Métricas de Mejora
                            </h3>

                            {/* Barra de Consistencia */}
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">
                                        Consistencia
                                    </span>
                                    <span className="text-xs font-mono text-blue-400">
                                        {userData?.summary?.consistency || 0}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-800 h-1 rounded-full">
                                    <div
                                        className="bg-blue-500 h-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-700"
                                        style={{ width: `${userData?.summary?.consistency || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                                <p className="text-[9px] uppercase text-slate-500 mb-1">Win Rate</p>
                                <p className="text-xl font-mono font-bold text-emerald-400">
                                    {userData?.performance?.winRate || '0%'}
                                </p>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                                <p className="text-[9px] uppercase text-slate-500 mb-1">
                                    PnL Realizado
                                </p>
                                <p className="text-xl font-mono font-bold text-white">
                                    {userData?.performance?.totalPnL || '0'}€
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-black/40 border-t border-slate-800">
                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-600">
                            <span>CONEXIÓN: ESTABLE</span>
                            <span className="text-emerald-500 animate-pulse">LIVE</span>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    )
}

export default App
