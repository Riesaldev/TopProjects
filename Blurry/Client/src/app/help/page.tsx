"use client";

import React from "react";
import { Ticket, SupportChatMessage } from "@/types";

const FAQS = [
	{
		q: "¿Cómo reporto a un usuario?",
		a: "En cualquier chat o videollamada, haz clic en 'Reportar usuario' y completa el formulario.",
	},
	{
		q: "¿Cómo recupero mi contraseña?",
		a: "Haz clic en '¿Olvidaste tu contraseña?' en la pantalla de inicio de sesión y sigue las instrucciones.",
	},
	{
		q: "¿Cómo funcionan las misiones y logros?",
		a: "Completa misiones diarias y semanales para ganar tokens y desbloquear logros. Los logros secretos se revelan al cumplir condiciones especiales.",
	},
	{
		q: "¿Cómo puedo mejorar mi privacidad?",
		a: "Puedes ajustar el modo oscuro, el tamaño de fuente y el contraste desde la barra superior. Pronto podrás controlar más opciones de privacidad desde tu perfil.",
	},
];

interface UserSettingsPageProps {
	userId: number;
}

export default function HelpPage({ userId }: UserSettingsPageProps) {
	const [showChat, setShowChat] = React.useState(false);
	const [chatHistory, setChatHistory] = React.useState<SupportChatMessage[]>([]);
	const [chatInput, setChatInput] = React.useState("");
	const [tickets, setTickets] = React.useState<Ticket[]>([]);
	const [ticketForm, setTicketForm] = React.useState({ subject: "", message: "" });
	const [sending, setSending] = React.useState(false);

	React.useEffect(() => {
		// Simular fetch de tickets del usuario
		fetch(`/api/tickets?userId=${userId}`)
			.then((res) => res.json())
			.then(setTickets);
	}, [userId]);

	const handleChatSend = (e: React.FormEvent) => {
		e.preventDefault();
		if (!chatInput.trim()) return;
		const newMessage: SupportChatMessage = {
			id: Date.now(),
			message: chatInput,
			sender: "user",
			timestamp: new Date().toISOString(),
		};
		setChatHistory((h) => [...h, newMessage]);
		// Simular respuesta automática
		setTimeout(() => {
			const botMessage: SupportChatMessage = {
				id: Date.now() + 1,
				message: "¡Gracias por tu pregunta! Nuestro equipo te responderá pronto o revisa las preguntas frecuentes más abajo.",
				sender: "support",
				timestamp: new Date().toISOString(),
			};
			setChatHistory((h) => [...h, botMessage]);
		}, 800);
		setChatInput("");
	};

	const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setTicketForm({ ...ticketForm, [e.target.name]: e.target.value });
	};

	const handleTicketSend = async (e: React.FormEvent) => {
		e.preventDefault();
		setSending(true);
		// Simular envío y refresco
		await new Promise((res) => setTimeout(res, 800));
		setTickets((t) => [
			{
				id: Date.now(),
				subject: ticketForm.subject,
				message: ticketForm.message,
				status: "Pendiente",
				date: new Date().toLocaleString(),
			},
			...t,
		]);
		setTicketForm({ subject: "", message: "" });
		setSending(false);
	};

	return (
		<main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
			<h1 className="text-2xl font-bold mb-6">Centro de ayuda y soporte</h1>
			<section className="w-full max-w-2xl mb-8">
				<h2 className="text-lg font-semibold mb-2">Preguntas frecuentes (FAQ)</h2>
				<ul className="flex flex-col gap-2">
					{FAQS.map((faq, i) => (
						<li key={i} className="bg-white rounded shadow p-3">
							<details>
								<summary className="font-semibold cursor-pointer">{faq.q}</summary>
								<p className="mt-2 text-gray-600">{faq.a}</p>
							</details>
						</li>
					))}
				</ul>
			</section>
			<section className="w-full max-w-2xl mb-8">
				<h2 className="text-lg font-semibold mb-2">Chat de ayuda</h2>
				<div className="bg-white rounded shadow p-4 flex flex-col gap-2">
					<div className="h-40 overflow-y-auto flex flex-col gap-2 mb-2 border rounded p-2 bg-gray-50">
						{chatHistory.length === 0 && <div className="text-gray-400 text-sm">¡Haz una pregunta y te ayudamos!</div>}
						{chatHistory.map((msg, i) => (
							<div key={i} className={msg.sender === "user" ? "text-right" : "text-left text-blue-700"}>
								<span className={`${msg.sender === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-200 text-gray-700"} rounded-xl px-2.5 py-1 inline-block max-w-[80%]`}>
									{msg.message}
								</span>
							</div>
						))}
					</div>
					<form onSubmit={handleChatSend} className="flex gap-2">
						<input
							type="text"
							className="border rounded px-2 py-1 flex-1 focus:outline-blue-400"
							placeholder="Escribe tu pregunta..."
							value={chatInput}
							onChange={(e) => setChatInput(e.target.value)}
							aria-label="Pregunta para el chat de ayuda"
						/>
						<button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded font-semibold focus:outline-blue-400">
							Enviar
						</button>
					</form>
				</div>
			</section>
			<section className="w-full max-w-2xl mb-8">
				<h2 className="text-lg font-semibold mb-2">Enviar ticket de soporte</h2>
				<form onSubmit={handleTicketSend} className="bg-white rounded shadow p-4 flex flex-col gap-3" aria-label="Formulario de ticket de soporte">
					<label htmlFor="ticket-subject" className="font-semibold">
						Asunto
						<input
							id="ticket-subject"
							name="subject"
							value={ticketForm.subject}
							onChange={handleTicketChange}
							className="border rounded px-2 py-1 w-full focus:outline-blue-400"
							required
							aria-required="true"
						/>
					</label>
					<label htmlFor="ticket-message" className="font-semibold">
						Mensaje
						<textarea
							id="ticket-message"
							name="message"
							value={ticketForm.message}
							onChange={handleTicketChange}
							className="border rounded px-2 py-1 w-full focus:outline-blue-400"
							rows={3}
							required
							aria-required="true"
						/>
					</label>
					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded font-semibold focus:outline-blue-400"
						disabled={sending}
						aria-label="Enviar ticket"
					>
						{sending ? "Enviando..." : "Enviar ticket"}
					</button>
				</form>
			</section>
			<section className="w-full max-w-2xl mb-8">
				<h2 className="text-lg font-semibold mb-2">Mis tickets enviados</h2>
				<ul className="flex flex-col gap-2">
					{tickets.length === 0 ? (
						<li className="text-gray-500">No has enviado tickets aún.</li>
					) : (
						tickets.map((t) => (
							<li key={t.id} className="bg-white rounded shadow p-3 flex flex-col gap-1">
								<div className="font-semibold">{t.subject}</div>
								<div className="text-xs text-gray-500">{t.date}</div>
								<div className="text-sm">{t.message}</div>
								<div className={`text-xs font-semibold ${t.status === "Resuelto" ? "text-green-600" : t.status === "Pendiente" ? "text-yellow-700" : "text-blue-700"}`}>
									Estado: {t.status}
								</div>
							</li>
						))
					)}
				</ul>
			</section>
		</main>
	);
}