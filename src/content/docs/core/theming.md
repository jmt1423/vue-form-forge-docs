---
title: Themes and Styling
description: Setting and updating themes for the form builder
---

There are two different theme files, which you should have created during the setup process.

## `style.css`
- This file contains the main css variables that handle the colors for all of the UI
elements. Feel free to change this as you please. The form builder is meant to be as plug and play as possible
but I also have tried to make it as simple as I could to change base colors.
- If you do not want to manually change the theme, you can also head over to
[Shadcn-vue themes](https://www.shadcn-vue.com/themes.html) to quickly change the theme to your personal needs.

## `formkit.theme.ts`
- This file is insanely long, and can be somewhat of a pain to edit manually. Thankfully Formkit offers
a relatively simple way of creating and updating their themes at the [Formkit themes website](https://themes.formkit.com/).
- Please note, that the theme file in the installation has been edited manually, and therefore cannot be updated
by the Formkit theme CLI.
