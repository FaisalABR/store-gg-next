import Input from "@/components/atoms/Input";
import Sidebar from "@/components/organisms/Sidebar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { JWTPayloadTypes, PlayerTypes } from "@/services/data-types";
import { jwtDecode } from "jwt-decode";
import { updateProfile } from "@/services/player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [image, setImage] = useState<any | null>("");
  const [imgPreview, setImagePreview] = useState<any | null>("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userPayload: PlayerTypes = payload.player;
      setUser(userPayload);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("image", user.avatar);
    data.append("name", user.name);

    const result = await updateProfile(data);

    if (result.error) {
      toast.error(result.message);
    } else {
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="position-relative me-20">
                  <img
                    src={imgPreview ? imgPreview : user.avatar}
                    width={90}
                    height={90}
                    className="avatar preview img-fluid"
                    alt="avatar"
                  />
                  <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                    <Image
                      src="/icon/trash.svg"
                      width={24}
                      height={24}
                      alt="trash"
                    />
                  </div>
                </div>
                <div className="image-upload">
                  <label htmlFor="avatar">
                    <Image
                      src="/icon/avatar.svg"
                      width={90}
                      height={90}
                      alt="placeholder avatar"
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      const img = e.target.files[0];
                      setImagePreview(URL.createObjectURL(img));
                      setUser({ ...user, avatar: img.name });
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" disabled value={user.email} />
              </div>
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
