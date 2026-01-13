
import { TestimonialCard } from "../ui/TestimonialCard";
import users from '../../data/users.json';

export default function Testimonials () {
  return (
    <section className="w-full px-4 md:px-40 py-20 flex justify-center">
      <div className="max-w-275 w-full flex flex-col items-center gap-12">
        <h2 className="text-3xl font-bold text-text-main text-center">Lo que dice nuestra comunidad</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {users.map( user => (
            <TestimonialCard key={user.id} user={user} />
          ) )}
        </div>
      </div>
    </section>
  );
}