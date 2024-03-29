import CheckoutConfirmation from "@/components/organisms/CheckoutConfirmation";
import CheckoutDetails from "@/components/organisms/CheckoutDetails";
import CheckoutItem from "@/components/organisms/CheckoutItem";
import Image from "next/image";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { JWTPayloadTypes, PlayerTypes } from "@/services/data-types";

interface CheckoutProps {
  user: PlayerTypes;
}

export default function Checkout(props: CheckoutProps) {
  const { user } = props;

  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <a className="" href="#">
            <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
          </a>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">
            Waktunya meningkatkan cara bermain
          </p>
        </div>
        <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
          <CheckoutItem />
        </div>
        <hr />
        <CheckoutDetails />
        <CheckoutConfirmation />
      </div>
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}
export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const userPayload: PlayerTypes = payload.player;
  const img = `${process.env.NEXT_PUBLIC_IMG}/${userPayload.avatar}`;
  userPayload.avatar = img;

  return {
    props: { user: userPayload },
  };
}
