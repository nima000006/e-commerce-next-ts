"use client";
import { useTranslation } from "../component/languageProvider/LanguageProvider";

export const MenuItems = () => {
  const t = useTranslation();
  return [
    {
      id: 1,
      label: t("MENU.PERFUME"),
      href: "/perfume",
      columns: [
        {
          title: t("SUBMENU.FRAGRANCE"),
          href: "/frangrance",
          items: [
            { label: t("SUBMENU.SPRAYS"), href: "/perfume/sprays" },
            { label: t("SUBMENU.OILS"), href: "/perfume/oils" },
            { label: t("SUBMENU.ROLL_ONS"), href: "/perfume/roll-ons" },
          ],
        },
        {
          title: t("SUBMENU.SETS"),
          href: "/sets",
          items: [
            { label: t("SUBMENU.GIFT_SETS"), href: "/perfume/gift-sets" },
            { label: t("SUBMENU.MINIATURES"), href: "/perfume/miniatures" },
            { label: t("SUBMENU.SAMPLES"), href: "/perfume/samples" },
          ],
        },
        {
          title: t("SUBMENU.ACCESSORIES"),
          href: "/accessories",
          items: [
            { label: t("SUBMENU.CASES"), href: "/perfume/cases" },
            { label: t("SUBMENU.HOLDERS"), href: "/perfume/holders" },
          ],
        },
        {
          title: t("SUBMENU.NEW_ARRIVALS"),
          href: "/arrivals",
          items: [
            { label: t("SUBMENU.SEASONAL"), href: "/perfume/seasonal" },
            {
              label: t("SUBMENU.LIMITED_EDITION"),
              href: "/perfume/limited-edition",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: t("MENU.CANDLES"),
      href: "/candles",
      columns: [
        {
          title: t("SUBMENU.SCENTS"),
          href: "/scents",
          items: [
            { label: t("SUBMENU.FLORAL"), href: "/candles/floral" },
            { label: t("SUBMENU.WOODY"), href: "/candles/woody" },
            { label: t("SUBMENU.CITRUS"), href: "/candles/citrus" },
          ],
        },
        {
          title: t("SUBMENU.SEASONAL"),
          href: "/seasonal",
          items: [
            { label: t("SUBMENU.HOLIDAY"), href: "/candles/holiday" },
            { label: t("SUBMENU.WINTER"), href: "/candles/winter" },
            { label: t("SUBMENU.SUMMER"), href: "/candles/summer" },
          ],
        },
        {
          title: t("SUBMENU.SIZE"),
          href: "/size",
          items: [
            { label: t("SUBMENU.SMALL"), href: "/candles/small" },
            { label: t("SUBMENU.MEDIUM"), href: "/candles/medium" },
            { label: t("SUBMENU.LARGE"), href: "/candles/large" },
          ],
        },
        {
          title: t("SUBMENU.NEW_ARRIVALS"),
          href: "/arrivals",
          items: [
            { label: t("SUBMENU.NEW_SCENTS"), href: "/candles/new-scents" },
            { label: t("SUBMENU.BESTSELLERS"), href: "/candles/bestsellers" },
          ],
        },
      ],
    },
    {
      id: 3,
      label: t("MENU.HOME"),
      href: "/home",
      columns: [
        {
          title: t("SUBMENU.DECOR"),
          href: "/decor",
          items: [
            { label: t("SUBMENU.WALL_ART"), href: "/home/decor/wall-art" },
            { label: t("SUBMENU.PILLOWS"), href: "/home/decor/pillows" },
            { label: t("SUBMENU.BLANKETS"), href: "/home/decor/blankets" },
          ],
        },
        {
          title: t("SUBMENU.FURNITURE"),
          href: "/furniture",
          items: [
            { label: t("SUBMENU.CHAIRS"), href: "/home/furniture/chairs" },
            { label: t("SUBMENU.TABLES"), href: "/home/furniture/tables" },
          ],
        },
        {
          title: t("SUBMENU.KITCHEN"),
          href: "/kitchen",
          items: [
            { label: t("SUBMENU.COOKWARE"), href: "/home/kitchen/cookware" },
            { label: t("SUBMENU.UTENSILS"), href: "/home/kitchen/utensils" },
          ],
        },
        {
          title: t("SUBMENU.BATH"),
          href: "/bath",
          items: [
            { label: t("SUBMENU.TOWELS"), href: "/home/bath/towels" },
            {
              label: t("SUBMENU.SHOWER_CURTAINS"),
              href: "/home/bath/shower-curtains",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      label: t("MENU.HANDS"),
      href: "/hands",
      columns: [
        {
          title: t("SUBMENU.CARE"),
          href: "/care",
          items: [
            { label: t("SUBMENU.SOAPS"), href: "/hands/care/soaps" },
            {
              label: t("SUBMENU.MOISTURIZERS"),
              href: "/hands/care/moisturizers",
            },
          ],
        },
        {
          title: t("SUBMENU.ACCESSORIES"),
          href: "/accessories",
          items: [
            {
              label: t("SUBMENU.SANITIZERS"),
              href: "/hands/accessories/sanitizers",
            },
            { label: t("SUBMENU.LOTIONS"), href: "/hands/accessories/lotions" },
          ],
        },
        {
          title: t("SUBMENU.EXFOLIATORS"),
          href: "/exfoliators",
          items: [
            { label: t("SUBMENU.SCRUBS"), href: "/hands/exfoliators/scrubs" },
            { label: t("SUBMENU.MASKS"), href: "/hands/exfoliators/masks" },
          ],
        },
        {
          title: t("SUBMENU.SPECIAL_CARE"),
          href: "care",
          items: [
            {
              label: t("SUBMENU.ANTI_AGING"),
              href: "/hands/special-care/anti-aging",
            },
            { label: t("SUBMENU.REPAIR"), href: "/hands/special-care/repair" },
          ],
        },
      ],
    },
    {
      id: 5,
      label: t("MENU.PANTRY"),
      href: "/pantry",
      columns: [
        {
          title: t("SUBMENU.SNACKS"),
          href: "snacks",
          items: [
            { label: t("SUBMENU.CHIPS"), href: "/pantry/snacks/chips" },
            { label: t("SUBMENU.NUTS"), href: "/pantry/snacks/nuts" },
          ],
        },
        {
          title: t("SUBMENU.SPICES"),
          href: "spices",
          items: [
            { label: t("SUBMENU.HERBS"), href: "/pantry/spices/herbs" },
            { label: t("SUBMENU.MIXES"), href: "/pantry/spices/mixes" },
          ],
        },
        {
          title: t("SUBMENU.BEVERAGES"),
          href: "beverages",
          items: [
            { label: t("SUBMENU.TEA"), href: "/pantry/beverages/tea" },
            { label: t("SUBMENU.COFFEE"), href: "/pantry/beverages/coffee" },
          ],
        },
        {
          title: t("SUBMENU.GRAINS"),
          href: "grains",
          items: [
            { label: t("SUBMENU.RICE"), href: "/pantry/grains/rice" },
            { label: t("SUBMENU.PASTA"), href: "/pantry/grains/pasta" },
          ],
        },
      ],
    },
    {
      id: 6,
      label: t("MENU.COLLECTIONS"),
      href: "/collections",
      columns: [
        {
          title: t("SUBMENU.SEASONAL"),
          href: "seasonal",
          items: [
            {
              label: t("SUBMENU.SUMMER_COLLECTION"),
              href: "/collections/seasonal/summer",
            },
            {
              label: t("SUBMENU.WINTER_COLLECTION"),
              href: "/collections/seasonal/winter",
            },
          ],
        },
        {
          title: t("SUBMENU.EXCLUSIVE"),
          href: "exclusive",
          items: [
            {
              label: t("SUBMENU.LUXURY"),
              href: "/collections/exclusive/luxury",
            },
            {
              label: t("SUBMENU.DESIGNER"),
              href: "/collections/exclusive/designer",
            },
          ],
        },
        {
          title: t("SUBMENU.POPULAR"),
          href: "popular",
          items: [
            {
              label: t("SUBMENU.BESTSELLERS"),
              href: "/collections/popular/bestsellers",
            },
            {
              label: t("SUBMENU.TRENDING"),
              href: "/collections/popular/trending",
            },
          ],
        },
        {
          title: t("SUBMENU.NEW_ARRIVALS"),
          href: "arrivals",
          items: [
            {
              label: t("SUBMENU.RECENT_LAUNCHES"),
              href: "/collections/new/recent",
            },
          ],
        },
      ],
    },
    {
      id: 7,
      label: t("MENU.GIFTS"),
      href: "/gifts",
      columns: [
        {
          title: t("SUBMENU.BY_OCCASION"),
          href: "occasian",
          items: [
            { label: t("SUBMENU.BIRTHDAY"), href: "/gifts/occasion/birthday" },
            {
              label: t("SUBMENU.ANNIVERSARY"),
              href: "/gifts/occasion/anniversary",
            },
          ],
        },
        {
          title: t("SUBMENU.FOR_HIM"),
          href: "for-him",
          items: [
            {
              label: t("SUBMENU.FRAGRANCES"),
              href: "/gifts/for-him/fragrances",
            },
            {
              label: t("SUBMENU.ACCESSORIES"),
              href: "/gifts/for-him/accessories",
            },
          ],
        },
        {
          title: t("SUBMENU.FOR_HER"),
          href: "for-her",
          items: [
            { label: t("SUBMENU.BEAUTY"), href: "/gifts/for-her/beauty" },
            {
              label: t("SUBMENU.ACCESSORIES"),
              href: "/gifts/for-her/accessories",
            },
          ],
        },
        {
          title: t("SUBMENU.PERSONALIZED"),
          href: "personalized",
          items: [
            {
              label: t("SUBMENU.ENGRAVING"),
              href: "/gifts/personalized/engraving",
            },
            {
              label: t("SUBMENU.PHOTO_FRAMES"),
              href: "/gifts/personalized/photo-frames",
            },
          ],
        },
      ],
    },
  ];
};
