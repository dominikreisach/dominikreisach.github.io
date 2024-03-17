/*
This file is licensed under the MIT License
See LICENSE-MIT for details
*/

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode:"class",
    content: ["./*.html"],
    theme: {
      extend: {
        screens:{
          "sm":"480px"
        },
      },
    },
    plugins: [],
  }