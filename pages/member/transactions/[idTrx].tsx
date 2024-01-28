import TransactionDetailContent from "@/components/organisms/TransactionDetailContent";
import {
  JWTPayloadTypes,
  PlayerTypes,
  TransactionDetailTypes,
} from "@/services/data-types";
import { getTransactionDetail } from "@/services/member";
import { jwtDecode } from "jwt-decode";

interface TransactionTypes {
  transactionDetail: { data: TransactionDetailTypes };
}

export default function detail({ transactionDetail }: TransactionTypes) {
  return (
    <section className="transactions-detail overflow-auto">
      <TransactionDetailContent data={transactionDetail.data} />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    idTrx: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { token } = req.cookies;
  const { idTrx } = params;

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

  const response = await getTransactionDetail(idTrx, jwtToken);
  console.log("Transaction detail >>>", response.data);

  return {
    props: { transactionDetail: response.data },
  };
}
