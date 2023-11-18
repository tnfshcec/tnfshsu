import type { IconifyIcon, IconifyJSON, IconifyOptional } from "@iconify/types";

const TTL = 1000 * 60 * 60 * 24 * 7; // 1 week

type RequiredIcon = Required<IconifyIcon>;
type CacheValue = { icon: RequiredIcon; timeFetched: number };

const cache = new Map<string, CacheValue>();

const iconifyDefault = {
  left: 0,
  top: 0,
  width: 16,
  height: 16,
  hFlip: false,
  vFlip: false,
  rotate: 0,
} as const satisfies { [key in keyof Required<IconifyOptional>]: IconifyOptional[key] };

function separatePrefix(icon: string): [string, string] {
  if (!/^\w+:\w+$/.test(icon)) {
    throw new Error(`Invalid icon name: '${icon}'`);
  }
  // WARNING: any ¯\_(ツ)_/¯
  return icon.split(":") as any;
}

async function fetchIcon(prefix: string, name: string): Promise<RequiredIcon> {
  const iconify = `https://api.iconify.design/${prefix}.json?icons=${name}`;

  const iconJson = await fetch(iconify).then<IconifyJSON>((r) => r.json());
  const iconData = iconJson.icons[name];

  iconData.left ??= iconJson.left ?? iconifyDefault.left;
  iconData.top ??= iconJson.top ?? iconifyDefault.top;
  iconData.width ??= iconJson.width ?? iconifyDefault.width;
  iconData.height ??= iconJson.height ?? iconifyDefault.height;

  iconData.hFlip ??= iconifyDefault.hFlip;
  iconData.vFlip ??= iconifyDefault.vFlip;
  iconData.rotate ??= iconifyDefault.rotate;

  return {
    ...iconifyDefault,
    left: iconJson.left ?? iconifyDefault.left,
    top: iconJson.top ?? iconifyDefault.top,
    width: iconJson.width ?? iconifyDefault.width,
    height: iconJson.height ?? iconifyDefault.height,
    ...iconData,
  };
}

export async function getIcon(icon: string): Promise<RequiredIcon> {
  const cachedValue = cache.get(icon);
  if (cachedValue && Date.now() - cachedValue.timeFetched < TTL) {
    return cachedValue.icon;
  }

  const iconData = await fetchIcon(...separatePrefix(icon));
  cache.set(icon, { icon: iconData, timeFetched: Date.now() });

  return iconData;
}
