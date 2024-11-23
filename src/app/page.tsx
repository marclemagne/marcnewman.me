import SocialLinkedIn from "@/app/components/social-linkedin";
import MarcNewman from "@/app/components/marc-newman";

export default function Home() {
  return (
    <div className="grid h-dvh place-items-center">
      <main className="space-y-4 text-center">
        <MarcNewman />
        <SocialLinkedIn />
      </main>
    </div>
  );
}
