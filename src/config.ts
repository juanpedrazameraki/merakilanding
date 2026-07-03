// Los enlaces de wa.me requieren el número en formato internacional (código de país incluido).
// El número mostrado al usuario se mantiene en formato local.
export const WA_PHONE = '524425041110';
export const CONTACT_PHONE_DISPLAY = '442 504 1110';
export const CONTACT_EMAIL = 'contacto@merakicode.mx';

export function waLink(msg: string): string {
  return 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(msg);
}
