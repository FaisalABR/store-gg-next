import { setSignUp } from "@/services/auth";
import { CategoryTypes, LocalFormTypes } from "@/services/data-types";
import { getGameCategory } from "@/services/player";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState<any | null>();
  const [image, setImage] = useState<any | null>("");
  const [imagePreview, setImagePreview] = useState<any | null>("");
  const [userForm, setUserForm] = useState<any | null>({});

  const router = useRouter();

  const getCategoriesAPI = useCallback(async () => {
    const data = await getGameCategory();
    setCategories(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getCategoriesAPI();
  }, []);

  useEffect(() => {
    const getUserForm = localStorage.getItem("user-form");
    setUserForm(JSON.parse(getUserForm!));
  }, []);

  const onSubmit = async () => {
    const localForm = await localStorage.getItem("user-form");
    const form = JSON.parse(localForm!);
    const data = new FormData();

    data.append("image", image);
    data.append("role", "user");
    data.append("status", "Y");
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("name", form.name);
    data.append("username", form.name);
    data.append("phoneNumber", "0822312313");
    data.append("favorite", favorite!);

    const result = await setSignUp(data);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      await localStorage.removeItem("user-form");
      router.push("/sign-up-success");
    }
  };
  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="image-uploads"
                        alt="avatar"
                      />
                    ) : (
                      <Image
                        src="/icon/avatar.svg"
                        width={120}
                        height={120}
                        alt="avatar"
                      />
                    )}
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

                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {userForm.name}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {userForm.email}
              </p>
              <div className="pt-50 pb-50">
                <label
                  htmlFor="category"
                  className="form-label text-lg fw-medium color-palette-1 mb-10"
                >
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(e) => setFavorite(e.target.value)}
                >
                  {categories.map((category: CategoryTypes) => (
                    <option key={category._id} value={category._id} selected>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={onSubmit}
              >
                Create My Account
              </button>

              <Link
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="#"
                role="button"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
