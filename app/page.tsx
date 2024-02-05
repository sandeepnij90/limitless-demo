import { LoginButton } from "@/components/LoginButton";

export default function Login() {
  return (
    <main className="bg-[url('/loginImage.png')] bg-black flex justify-center items-center h-screen bg-no-repeat bg-right-bottom">
      <div className="flex justify-center items-center max-w-[480px]">
        <section className="text-center">
          <h1 className="text-5xl text-white">Limitless Training</h1>
          <h2 className="text-3xl pt-3 text-orange-500">For Dog Trainers</h2>

          <div className="p-4 text-white">
            <p className="mt-6 mb-4">
              At Limitless Dog Training for Trainers, we recognize that the key
              to success lies in seamless communication and progress tracking.
            </p>
            <p>
              From giving clients homework, booking lessons, and managing group
              classes.
            </p>
          </div>
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </section>
      </div>
    </main>
  );
}
