import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="flex w-full max-w-125 min-h-75 m-6">
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
