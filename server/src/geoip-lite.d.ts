declare module "geoip-lite" {
  export interface GeoLookup {
    range?: [number, number];
    country?: string;
    region?: string;
    timezone?: string;
    city?: string;
    ll?: [number, number];
    metro?: number;
    area?: number;
    eu?: string;
  }

  export function lookup(ip: string): GeoLookup | null;

  const geoip: {
    lookup(ip: string): GeoLookup | null;
  };

  export default geoip;
}
