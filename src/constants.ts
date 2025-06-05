import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";

import IconBsky from "@/assets/icons/IconBsky2.svg";
import { SITE } from "@/config";

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/jeffrygonzalez",
    linkTitle: ` ${SITE.title} on Github`,
    icon: IconGitHub,
  },
   {
    name: "Github",
    href: "https://github.com/hypertheorytraining",
    linkTitle: ` ${SITE.title} on Github`,
    icon: IconGitHub,
  },
 
  {
    name: "BlueSky",
    href: "https://bsky.app/profile/jeffrygonzalez.dev",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconBsky,
  },

] as const;

export const SHARE_LINKS = [
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
