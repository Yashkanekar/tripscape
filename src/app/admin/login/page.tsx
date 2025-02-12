"use client";
import React, { useState } from "react";
import {
  CardFooter,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { ADMIN_API_ROUTES } from "@/utils/api-routes";
import { apiClient } from "@/lib";
import { useAppStore } from "@/store";
import axios from "axios";

// import { apiClient } from "@/lib";
// import { useAppStore } from "@/store";
// import { ADMIN_API_ROUTES } from "@/utils/api-routes";

const inter = Inter({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
});

const poppins = Poppins({ subsets: ["latin"], weight: "700" });

const Login = () => {
  const router = useRouter();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const response = await axios.post(ADMIN_API_ROUTES.LOGIN, {
      email,
      password,
    });
    console.log(response);
    if (response.data.userInfo) {
      setUserInfo(response.data.userInfo);
      router.push("/admin");
    }
  };

  return (
    <div
      className="h-[100vh] w-full flex items-center justify-center flex-col"
      style={{}}
    >
      {/* <div>
        <span className="text-xl uppercase font-extrabold italic text-red-500">
          <span className={inter.className}>TRIPSCAPE</span>
          <span className={inter.className}>
            Your journey, perfectly planned.
          </span>
        </span>
      </div> */}
      <div className="flex flex-col items-center space-y-2 mt-12">
        {/* Main header */}
        <h1
          className={`text-6xl font-extrabold italic text-red-600 ${poppins.className}`}
        >
          TRIPSCAPE
        </h1>
        <div className="w-[340px] h-0.5 bg-red-300 mt-1 mb-2"></div>
        {/* Tagline */}
        <p className={`text-xl font-medium text-red-400 ${inter.className}`}>
          Your journey, perfectly planned.
        </p>
      </div>
      <div className="w-full flex items-center justify-center gap-14 ">
        <Image
          src="/hero-image.svg"
          alt="logo"
          height={700}
          width={600}
          className="cursor-pointer"
          onClick={() => router.push("/admin/dashboard")}
        />
        <Card className="shadow-xl border-1 border-red-500 p-6 rounded-xl w-[480px]">
          <CardHeader className="flex flex-col gap-1 capitalize text-3xl items-center">
            <div className=" flex flex-col items-center justify-center">
              <Image
                src="/logo.png"
                alt="logo"
                height={80}
                width={80}
                className="cursor-pointer"
                onClick={() => router.push("/admin/dashboard")}
              />
              <span className="text-xl uppercase font-extrabold italic text-red-500">
                <span className={inter.className}>TRIPSCAPE Admin Login</span>
              </span>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col items-center w-full justify-center">
            <div className="flex flex-col gap-2 w-full">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color="danger"
                // variant="bordered"
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="danger"
              />
            </div>
          </CardBody>
          <CardFooter className="flex flex-col gap-2 items-center justify-center">
            <Button
              color="danger"
              variant="shadow"
              onPress={handleLogin}
              className="w-full capitalize"
              size="lg"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
