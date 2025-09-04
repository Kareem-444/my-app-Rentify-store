import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Home: 'Home',
      Tools: 'Tools',
      'My Tools': 'My Tools',
      Favorites: 'Favorites',
      Login: 'Login',
      Register: 'Register',
      Profile: 'Profile',
      'Rental Checkout': 'Rental Checkout',
      'Confirm Rent': 'Confirm Rent',
      // ...add more keys as needed
    },
  },
  ar: {
    translation: {
      Home: 'الرئيسية',
      Tools: 'الأدوات',
      'My Tools': 'أدواتي',
      Favorites: 'المفضلة',
      Login: 'تسجيل الدخول',
      Register: 'تسجيل',
      Profile: 'الملف الشخصي',
      'Rental Checkout': 'تأجير الأداة',
      'Confirm Rent': 'تأكيد الاستئجار',
      // ...add more keys as needed
    },
  },
  es: {
    translation: {
      Home: 'Inicio',
      Tools: 'Herramientas',
      'My Tools': 'Mis Herramientas',
      Favorites: 'Favoritos',
      Login: 'Iniciar sesión',
      Register: 'Registrarse',
      Profile: 'Perfil',
      'Rental Checkout': 'Alquilar herramienta',
      'Confirm Rent': 'Confirmar alquiler',
      // ...add more keys as needed
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
