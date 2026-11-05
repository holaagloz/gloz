import { SoftwareCase } from '../models/content.models';

/**
 * App de Viejos Barbería, hecha por Gloz: un ejemplo de sus desarrollos a medida.
 * Datos confirmados por Gloz el 4 y el 5 de noviembre de 2026: PWA para el celular, hecha para el único
 * barbero que la administra; reserva, panel, recordatorios; en uso; logo e íconos también de Gloz.
 * Video: materiales/originales/nuevas/video animacion viejos app.mp4.
 */
export const SOFTWARE_CASE: SoftwareCase = {
  client: 'Viejos Barbería',
  title: 'La app de Viejos Barbería',
  summary:
    'Es una app que se instala en el celular desde el navegador, sin pasar por una tienda de apps. La hicimos a la medida del único barbero que la administra: sus servicios, sus horarios y su forma de trabajar. También diseñamos su logo y sus íconos.',
  made: ['Logo', 'Íconos', 'Diseño', 'Desarrollo', 'App para celular (PWA)'],
  features: [
    { name: 'Reserva en línea', description: 'El cliente entra con su cuenta de Google y elige servicio, día y hora.' },
    { name: 'Panel del barbero', description: 'El barbero ve y administra su agenda desde el celular.' },
    { name: 'Recordatorios', description: 'Avisos automáticos al cliente antes de su cita.' },
  ],
  video: {
    src: 'video/viejos-app.mp4',
    poster: 'video/viejos-app-poster.webp',
    label: 'App de Viejos Barbería: el bigote dorado del logo se anima y abre la pantalla de inicio, con el lema "Tu estilo, nuestra tradición" y el botón para iniciar sesión con Google',
    width: 1280,
    height: 586,
    loop: false,
  },
  cta: 'Quiero un app así',
  whatsappMessage: 'Hola Gloz, vi la app de Viejos Barbería y quiero algo así para mi negocio.',
};
