import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
interface MenuItemProps {
  title: string;
  icon:
    | "ic-menu-overview"
    | "ic-menu-transaction"
    | "ic-menu-messages"
    | "ic-menu-card"
    | "ic-menu-reward"
    | "ic-menu-settings"
    | "ic-menu-logout";
  active?: boolean;
  href?: string;
  onClick?: () => void;
}
export default function MenuItem(props: MenuItemProps) {
  const { title, icon, active, href = "/", onClick } = props;
  const classItems = cx({
    item: true,
    "mb-30": true,
    active: active,
  });
  return (
    <div className={classItems} onClick={onClick}>
      <div className="me-3">
        <Image src={`/icon/${icon}.svg`} width={25} height={25} alt="logo" />
      </div>
      <p className="item-title m-0">
        {onClick ? (
          <a>{title}</a>
        ) : (
          <Link href={`${href}`} className="text-lg text-decoration-none">
            {title}
          </Link>
        )}
      </p>
    </div>
  );
}
