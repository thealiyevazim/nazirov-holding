export const languages = ['uz', 'ru', 'en'] as const

export type Language = (typeof languages)[number]

export type TranslationSchema = {
  navbar: {
    brand: string
    languageShort: string
    menu: {
      home: string
      work: string
      blog: string
      contact: string
    }
  }
  hero: {
    headline: {
      line1: string
      line2: string
      line3Prefix: string
      line3Accent: string
    }
    subtitle: string
    form: {
      emailLabel: string
      consentLabel: string
      submitLabel: string
    }
  }
  sections: {
    work: {
      title: string
      description: string
    }
    blog: {
      title: string
      description: string
    }
    contact: {
      title: string
      description: string
    }
  }
}

export const translations: Record<Language, TranslationSchema> = {
  uz: {
    navbar: {
      brand: "Nazirov's Holding",
      languageShort: 'UZ',
      menu: {
        home: 'Bosh sahifa',
        work: 'Hamkorlik',
        blog: 'Blog',
        contact: 'Aloqa',
      },
    },
    hero: {
      headline: {
        line1: 'Kelajakka sarmoya',
        line2: 'kiritamiz.',
        line3Prefix: 'Meros',
        line3Accent: 'yaratamiz.',
      },
      subtitle: 'Biznesingizni rivojlantirish uchun professional marketing maslahatlarini oling.',
      form: {
        emailLabel: 'Email manzil',
        consentLabel: 'Hamkorlikni boshlashga roziman',
        submitLabel: 'Yuborish',
      },
    },
    sections: {
      work: {
        title: 'Hamkorlik',
        description:
          'Biz brend pozitsiyalash, marketing strategiyasi va barqaror o‘sish uchun amaliy hamkorlik formatlarini taklif qilamiz.',
      },
      blog: {
        title: 'Blog',
        description:
          'Biznes rivoji, marketing va uzoq muddatli meros yaratish bo‘yicha foydali maqolalar shu yerda joylashadi.',
      },
      contact: {
        title: 'Aloqa',
        description:
          'Hamkorlik yoki savollar uchun xabaringizni yuboring — tez orada siz bilan bog‘lanamiz.',
      },
    },
  },

  ru: {
    navbar: {
      brand: "Nazirov's Holding",
      languageShort: 'RU',
      menu: {
        home: 'Главная',
        work: 'Сотрудничество',
        blog: 'Блог',
        contact: 'Контакты',
      },
    },
    hero: {
      headline: {
        line1: 'Инвестируем в будущее',
        line2: 'уверенно.',
        line3Prefix: 'Создаем',
        line3Accent: 'наследие.',
      },
      subtitle:
        'Получите профессиональные маркетинговые рекомендации для роста вашего бизнеса.',
      form: {
        emailLabel: 'Email',
        consentLabel: 'Я готов начать сотрудничество',
        submitLabel: 'Отправить',
      },
    },
    sections: {
      work: {
        title: 'Сотрудничество',
        description:
          'Мы предлагаем практичные форматы партнерства в области позиционирования бренда, маркетинговой стратегии и устойчивого роста.',
      },
      blog: {
        title: 'Блог',
        description:
          'Актуальные материалы о развитии бизнеса, маркетинге и создании долгосрочного наследия.',
      },
      contact: {
        title: 'Контакты',
        description:
          'Отправьте сообщение по вопросам или сотрудничеству — мы свяжемся с вами в ближайшее время.',
      },
    },
  },

  en: {
    navbar: {
      brand: "Nazirov's Holding",
      languageShort: 'EN',
      menu: {
        home: 'Home',
        work: 'Work With Us',
        blog: 'Blog',
        contact: 'Contact',
      },
    },
    hero: {
      headline: {
        line1: 'We invest in the future',
        line2: 'with confidence.',
        line3Prefix: 'We build',
        line3Accent: 'lasting legacy.',
      },
      subtitle:
        'Receive expert marketing guidance to grow your business with clarity and confidence.',
      form: {
        emailLabel: 'Email address',
        consentLabel: 'I’m ready to start collaboration',
        submitLabel: 'Submit',
      },
    },
    sections: {
      work: {
        title: 'Work With Us',
        description:
          'We offer practical collaboration models for brand positioning, marketing strategy, and sustainable growth.',
      },
      blog: {
        title: 'Blog',
        description:
          'Insights on business growth, marketing strategy, and building long-term legacy.',
      },
      contact: {
        title: 'Contact',
        description:
          'Send your partnership or project inquiry and we will get back to you shortly.',
      },
    },
  },
}