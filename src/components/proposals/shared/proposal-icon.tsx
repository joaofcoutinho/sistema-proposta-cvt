import {
  type Icon,
  IconAd,
  IconAdjustmentsHorizontal,
  IconArrowsExchange,
  IconArrowsVertical,
  IconBolt,
  IconBroadcast,
  IconBulb,
  IconBrandFigma,
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconChartBar,
  IconChartDots,
  IconChartHistogram,
  IconChartLine,
  IconCheck,
  IconClipboardCheck,
  IconClock,
  IconCreditCard,
  IconDeviceAnalytics,
  IconDeviceMobile,
  IconExternalLink,
  IconEye,
  IconFileText,
  IconHeadset,
  IconLayoutBoardSplit,
  IconMail,
  IconPalette,
  IconPencil,
  IconPhoto,
  IconRocket,
  IconSearch,
  IconSettings,
  IconShieldCheck,
  IconShoppingCart,
  IconSparkles,
  IconSpeakerphone,
  IconStar,
  IconTargetArrow,
  IconTrendingUp,
  IconUsers,
  IconVideo,
  IconWorld,
} from "@tabler/icons-react";

/**
 * Registro de ícones Tabler disponíveis para o conteúdo das propostas.
 * O campo `icon` do JSONB guarda a chave (ex.: "IconRocket").
 */
const ICONS: Record<string, Icon> = {
  IconAd,
  IconAdjustmentsHorizontal,
  IconArrowsExchange,
  IconArrowsVertical,
  IconBolt,
  IconBroadcast,
  IconBulb,
  IconBrandFigma,
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconChartBar,
  IconChartDots,
  IconChartHistogram,
  IconChartLine,
  IconCheck,
  IconClipboardCheck,
  IconClock,
  IconCreditCard,
  IconDeviceAnalytics,
  IconDeviceMobile,
  IconExternalLink,
  IconEye,
  IconFileText,
  IconHeadset,
  IconLayoutBoardSplit,
  IconMail,
  IconPalette,
  IconPencil,
  IconPhoto,
  IconRocket,
  IconSearch,
  IconSettings,
  IconShieldCheck,
  IconShoppingCart,
  IconSparkles,
  IconSpeakerphone,
  IconStar,
  IconTargetArrow,
  IconTrendingUp,
  IconUsers,
  IconVideo,
  IconWorld,
};

/** Nomes de ícones disponíveis (útil para selects no editor da Etapa 5). */
export const ICON_NAMES = Object.keys(ICONS);

interface ProposalIconProps {
  name: string;
  className?: string;
  stroke?: number;
}

/** Renderiza um ícone Tabler pelo nome; cai em IconStar se não existir. */
export function ProposalIcon({
  name,
  className,
  stroke = 1.75,
}: ProposalIconProps) {
  const Component = ICONS[name] ?? IconStar;
  return <Component className={className} stroke={stroke} aria-hidden />;
}
