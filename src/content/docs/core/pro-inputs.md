---
title: Default Items and Pro Inputs
description: Extending the form builder with formkit pro inputs
---

## Default Values

There are currently seventeen input types and are all available for free.

```typescript
// default-form-elements.ts
const defaultFormElements: FormKitSchemaFormKit[] = [
  {
    $formkit: "text",
    name: "Text",
    label: "Client Name",
    outerClass: "!col-span-2",
    id: "text_field",
    placeholder: "Enter your name",
    help: "This is help text",
    validation: "",
    validationVisibility: "live",
    description: "Single line text field",
  },
  {
    $formkit: "textarea",
    name: "Text Area",
    label: "Client Address",
    id: "textarea_field",
    outerClass: "!col-span-2",
    placeholder: "Enter your address",
    help: "This is help text",
    validation: "",
    validationVisibility: "live",
    description: "Multi-line text field",
  },
  {
    $formkit: "email",
    name: "Email",
    label: "Client Email",
    outerClass: "!col-span-2",
    id: "email_field",
    placeholder: "Enter your email",
    help: "This is help text",
    validation: "email",
    validationVisibility: "live",
    description: "Email field input",
  },
  {
    $formkit: "number",
    name: "Number",
    label: "Client Age",
    outerClass: "!col-span-2",
    id: "number_field",
    placeholder: "Enter your age",
    number: "integer",
    help: "This is help text",
    validation: "number",
    validationVisibility: "live",
    description: "Single number input",
  },
  {
    $formkit: "url",
    label: "URL Field",
    help: "This is help text",
    outerClass: "!col-span-2",
    placeholder: "https://www.example.com",
    name: "URL",
    id: "url_field",
    validation: "url",
    validationVisibility: "live",
    description: "URL field input",
  },
  {
    $formkit: "checkbox",
    label: "Label For Checkbox",
    help: "This is help text",
    outerClass: "!col-span-2",
    name: "Checkbox",
    options: ["One"],
    id: "checkbox_field",
    validation: "",
    validationVisibility: "live",
    description: "Multiple choice checkbox",
  },
  {
    $formkit: "color",
    label: "Color Field",
    value: "#00ff00",
    help: "This is help text",
    outerClass: "!col-span-2",
    name: "Color",
    id: "color_field",
    validation: "",
    validationVisibility: "live",
    description: "Color picker",
  },
  {
    $formkit: "date",
    label: "Date Field",
    help: "This is help text",
    outerClass: "!col-span-2",
    name: "Date",
    id: "date_field",
    validation: "",
    validationVisibility: "live",
    description: "Date input picker",
  },
  {
    $formkit: "time",
    label: "Time Field",
    help: "This is help text",
    outerClass: "!col-span-2",
    name: "Time",
    id: "time_field",
    validation: "",
    validationVisibility: "live",
    description: "Time input picker",
  },
  {
    $formkit: "datetime-local",
    label: "Date Time Local Field",
    help: "This is help text",
    outerClass: "!col-span-2",
    name: "Date-Time",
    id: "datetime_local_field",
    validation: "",
    validationVisibility: "live",
    description: "Date and time input",
  },
  {
    $formkit: "file",
    label: "File Field",
    help: "Accepts .pdf, .doc, .docx, .xml, .md, .csv, .jpg, .png, .webp",
    outerClass: "!col-span-2",
    name: "File Picker",
    id: "file_field",
    validation: "",
    accept: ".pdf,.doc,.docx,.xml,.md,.csv,.jpg,.png,.webp",
    validationVisibility: "live",
    description: "One or more file uploads",
  },
  {
    $formkit: "password",
    label: "Password Field",
    placeholder: "Enter your password",
    help: "This is help text",
    outerClass: "!col-span-2",
    name: "Password",
    id: "password_field",
    validation: "",
    validationVisibility: "live",
    description: "Password masked field",
  },
  {
    $formkit: "radio",
    options: ["one"],
    label: "Radio Field",
    outerClass: "!col-span-2",
    help: "This is help text",
    name: "Radio",
    id: "radio_field",
    validation: "",
    validationVisibility: "live",
    description: "Single choice select",
  },
  {
    $formkit: "range",
    label: "Range Field",
    children: "$slots.default",
    help: "This is help text",
    outerClass: "!col-span-2",
    value: "0",
    name: "Range",
    __raw__sectionsSchema: {
      prefix: {
        $el: "div",
        attrs: {
          class:
            " py-1 px-2 mr-1 text-sm flex items-center bg-muted mr-2 rounded-md",
        },
        children: "$value",
      },
    },
    id: "range_field",
    validation: "",
    validationVisibility: "live",
    description: "Slider field input",
  },
  {
    $formkit: "select",
    label: "Select Field",
    help: "This is help text",
    outerClass: "!col-span-2",
    name: "Dropdown Select",
    id: "select_field",
    validation: "",
    validationVisibility: "live",
    options: ["one"],
    description: "Selection dropdown",
  },
  {
    $formkit: "tel",
    label: "Tel Field",
    placeholder: "(+XX) XXXXXXXXXX",
    outerClass: "!col-span-2",
    help: "This is help text",
    name: "Telephone Number",
    id: "tel_field",
    validation: "",
    validationVisibility: "live",
    description: "Telephone input field",
  },
  {
    $formkit: "submit",
    outerClass: "!col-span-2 pt-2",
    type: "submit",
    name: "Submit Button",
    description: "Allows form submission",
    label: "Submit",
  },
];
```

### Extending to Pro Inputs

If you want to add to the number of form inputs your users have access to, formkit offers
14 extra inputs you can use in your application.

Once you sign up over at: [Formkit Pro](https://formkit.com/pro), it is easy as just adding the correct
schema object into the default form elements data structure:

> NOTE: using pro inputs in development is free and you will not be charged unless you are using them in a
> production environment

```typescript
// default-form-elements.ts
[
  // ...elements before
  {
    $formkit: "currency",
    label: "Money",
    help: "How much money do you make?",
    outerclass: "!col-span-2 pt-2",
    name: "currency",
    placeholder: "£5.00",
    value: "10.99",
    validation: "",
  },
  // elements after...
];
```

### Custom Inputs
Formkit allows you to build your own custom inputs as well, please see their docs for more information: [Custom Inputs](https://formkit.com/essentials/custom-inputs)
