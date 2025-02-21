import Link from "next/link";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandMastodon, IconBrandTelegram, IconBrandTwitter, IconSend } from "@tabler/icons-react";

function Socials() {
    return (
        <address className="flex flex-row w-full mt-xs text-black dark:text-white">
            <p className="sr-only">Email and Social Media for Jonah Bedouch</p>
            <Link href="https://sfba.social/@jonahbedouch" target="_blank" rel="me" className="hover:text-primary-500 sm:mr-sm sm:m-0 mr-auto motion-reduce:transition-none transition-colors" aria-label="mastodon">
                <IconBrandMastodon className="w-10 h-10" stroke={1.25} focusable={false} aria-hidden={true} />
            </Link>
            <Link href="https://twitter.com/jonahbedouch/" target="_blank" className="hover:text-primary-500 sm:mr-sm sm:m-0 mx-auto motion-reduce:transition-none transition-colors" aria-label="twitter">
                <IconBrandTwitter className="w-10 h-10" stroke={1.25} focusable={false} aria-hidden={true} />
            </Link>
            <Link href="https://github.com/jonahbedouch" target="_blank" className="hover:text-primary-500 sm:mr-sm sm:m-0 mx-auto motion-reduce:transition-none transition-colors" aria-label="github">
                <IconBrandGithub className="w-10 h-10" stroke={1.25} focusable={false} aria-hidden={true} />
            </Link>
            <Link href="https://linkedin.com/in/jonahbedouch" target="_blank" className="hover:text-primary-500 sm:mr-sm sm:m-0 mx-auto motion-reduce:transition-none transition-colors" aria-label="linked in">
                <IconBrandLinkedin className="w-10 h-10" stroke={1.25} focusable={false} aria-hidden={true} />
            </Link>
            <Link href="https://instagram.com/jonahbedouch" target="_blank" className="hover:text-primary-500 sm:mr-sm sm:m-0 mx-auto motion-reduce:transition-none transition-colors" aria-label="instagram">
                <IconBrandInstagram className="w-10 h-10" stroke={1.25} focusable={false} aria-hidden={true} />
            </Link>
            <Link href="mailto:jonah@bedouch.net" target="_blank" className="hover:text-primary-500 sm:m-0 ml-auto motion-reduce:transition-none transition-colors" aria-label="email jonah at bedouch dot net">
                <IconSend className="w-10 h-10" stroke={1.25} focusable={false} aria-hidden={true} />
            </Link>
        </address>
    )
}

export default Socials;