import UserSectionNav from "@/components/UserSectionNav";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <UserSectionNav />
      {children}
    </>
  );
}
