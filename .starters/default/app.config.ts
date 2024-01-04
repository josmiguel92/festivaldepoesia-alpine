export default defineAppConfig({
  alpine: {
    title: 'Festival de Poesía de La Habana',
    description: 'Web del Festival de Poesía de La Habana.',
    image: {
      src: '/social-card-preview.png',
      alt: 'Web del Festival de Poesía de La Habana.',
      width: 400,
      height: 300
    },
    header: {
      position: 'left', // possible value are : | 'left' | 'center' | 'right'
      logo: {
        path: '/logo.svg', // path of the logo
        pathDark: '/logo.svg', // path of the logo in dark mode, leave this empty if you want to use the same logo
        alt: 'Festival de Poesía de La Habana' // alt of the logo
      }
    },
    footer: {
      credits: {
        enabled: false, // possible value are : true | false
        repository: 'https://www.github.com/nuxt-themes/alpine' // our github repository
      },
      navigation: true, // possible value are : true | false
      alignment: 'center', // possible value are : 'none' | 'left' | 'center' | 'right'
      message: 'Follow us on' // string that will be displayed in the footer (leave empty or delete to disable)
    },
    socials: {
      facebook: 'Cubapoesia.fiph',
      youtube: {
        icon: 'uil:youtube',
        label: 'Youtube',
        href: 'https://www.youtube.com/channel/UCwIsxX6VKQivz0SakkYsXOg'
      }
    },
    form: {
      successMessage: 'Message sent. Thank you!'
    }
  }
})
