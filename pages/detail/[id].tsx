import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import TopUpForm from "@/components/organisms/TopUpForm";
import TopUpItems from "@/components/organisms/TopUpItems";
import {
  GameItemTypes,
  NominalTypes,
  PaymentTypes,
} from "@/services/data-types";
import { getDetailVoucher, getFeaturedGames } from "@/services/player";
import { useEffect } from "react";

interface DetailProps {
  dataItem: GameItemTypes;
  nominals: NominalTypes[];
  payments: PaymentTypes[];
}

export default function Detail({ dataItem, nominals, payments }: DetailProps) {
  useEffect(() => {
    localStorage.setItem("data-item", JSON.stringify(dataItem));
  }, []);
  return (
    <>
      <Navbar />
      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">
              Top Up
            </h2>
            <p className="text-lg color-palette-1 mb-0">
              Perkuat akun dan jadilah pemenang
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopUpItems type="mobile" data={dataItem} />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              <TopUpItems type="desktop" data={dataItem} />
              <hr />
              <TopUpForm nominals={nominals} payments={payments} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const data = await getFeaturedGames();
  const paths = data.map((item: GameItemTypes) => {
    return {
      params: {
        id: item._id,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
}

interface GetStaticProps {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const data = await getDetailVoucher(params.id);

  return {
    props: {
      dataItem: data.details,
      nominals: data.details.nominals,
      payments: data.payment,
    },
  };
}
