import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LockIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#1a1a1f] to-[#2a2a2f] p-4">
      <Card className="w-full max-w-md overflow-hidden rounded-lg border-0 bg-[#25252a] shadow-xl">
        <div className="rounded-lg bg-gradient-to-r from-[#1671E2] to-[#08E4D2] p-[2px]">
          <div className="rounded-lg bg-[#25252a]">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <LockIcon className="h-16 w-16 animate-pulse text-[#1671E2]" />
                  <div className="absolute inset-0 animate-pulse rounded-full bg-[#1671E2] opacity-20 blur-xl" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-white">403 - Access Denied</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Alert className="mb-6 border-[#1671E2]/30 bg-[#2a2a2f]">
                <AlertTitle className="text-lg text-[#B5B5B5]">Unauthorized Access</AlertTitle>
                <AlertDescription className="text-[#A0A0A0]">
                  You don’t have permission to view this page. Please contact your administrator or
                  return to the homepage.
                </AlertDescription>
              </Alert>
              <Link to="/">
                <Button className="bg-gradient-to-r from-[#1671E2] to-[#08E4D2] text-white transition-all duration-300 hover:from-[#145bb5] hover:to-[#06b7a8]">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotAuthorized;
