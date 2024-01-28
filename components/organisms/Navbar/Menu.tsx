interface MenuProps {
  title: string;
  active?: boolean;
  href?: string;
}

import cx from "classnames";
import Link from "next/link";

export default function Menu(props: MenuProps) {
  const { title, active, href = "/" } = props;

  const classTitle = cx({
    "nav-link": true,
    active,
  });

  return (
    <li className="nav-item my-auto">
      <Link className={classTitle} href={href}>
        {title}
      </Link>
    </li>
  );
}
