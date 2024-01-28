import SignInBanner from "@/components/organisms/SignInBanner";
import SignInForms from "@/components/organisms/SignInForms";
import Image from "next/image";
import React from "react";

export default function SignIn() {
  return (
    <section className="sign-in mx-auto">
      <div className="row">
        <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
          <form action="">
            <div className="container mx-auto">
              <div className="pb-50">
                <a className="navbar-brand">
                  <Image
                    src="/icon/logo.svg"
                    width={60}
                    height={60}
                    alt="logo"
                  />
                </a>
              </div>
              <h2 className="text-4xl fw-bold color-palette-1 mb-10">
                Sign In
              </h2>
              <p className="text-lg color-palette-1 m-0">
                Masuk untuk melakukan proses top up
              </p>
              <SignInForms />
            </div>
          </form>
        </div>
        <SignInBanner />
      </div>
    </section>
  );
}
