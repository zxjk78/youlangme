// import * as React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, blue, deepOrange, deepPurple, green, indigo, lightBlue, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';

export const chipColors = {
  primary: {
    main: red[300],
  },
  secondary: {
    main: pink[600],
  },
  error: {
    main: purple[300]
  },
  info: {
    main: yellow[800]
  },
  success: {
    main: teal[200]
  },
  warning: {
    main: green[400]
  },

}

export const mainColors = {
  mainYellow: {
    main: '#FFC700'
  },
  mainPurple: {
    main: '#B865C6'
  },
  mainGrey: {
    // grey 컬러 '#9BA7AF'
    main: '#9BA7AF',
  },
  mainWhite: {

    main: '#F9F3EE',
  },

}





// export const myTheme = createTheme({
//   palette: {
//     red: {
//       main: red[300],
//     },
//     pink: {
//       main: pink[600],
//     },
//     purple: {
//       main: purple[500]
//     },
//     deepPurple: {
//       main: deepPurple[400]
//     },
//     indigo: {
//       main: indigo[500]
//     },
//     blue: {
//       main: blue[700]
//     },
//     lightBlue: {
//       main: lightBlue[800]
//     },
//     teal: {
//       main: teal[500]
//     },
//     green: {
//       main: green[600]
//     },  
//     lime: {
//       main: lime[500]
//     },
//     yellow: {
//       main: yellow[500]
//     },
//     amber: {
//       main: amber[600]
//     },
//     orange: {
//       main: orange[500]
//     },
//     deepOrange: {
//       main: deepOrange[400]
//     },

//   },
// });

// export default function Palette() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Button>Primary</Button>
//       <Button color="secondary">Secondary</Button>
//     </ThemeProvider>
//   );
// }