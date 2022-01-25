export const signup = {
  id: 'signup',
  name: 'Signup',
  fillcontainer: 'signup-fillcontainer',
  fields: [
    {
      id: 'signup-email',
      type: 'email',
      label: 'Email',
      fieldref: 'email',
      required: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
      tooltipClass: 'form__tooltip',
      tooltipText: 'Please enter your email address',
    },
    {
      id: 'signup-password',
      type: 'password',
      label: 'Password',
      fieldref: 'password',
      required: true,
      fieldPair: {
        fieldref: 're-password',
        label: 'Re-enter Password',
        id: 'signup-re-password',
      },
      checkFieldPair: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
      tooltipClass: 'form__tooltip',
      tooltipText: 'Minimum 12 characters, at least one capital and one number',
      checkWidth: true,
      minWidth: 6,
    },
    {
      id: 'signup-re-password',
      type: 'password',
      label: 'Re-enter Password',
      fieldref: 're-password',
      required: true,
      fieldPair: {
        fieldref: 'password',
        label: 'Password',
        id: 'signup-password',
      },
      checkFieldPair: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
      tooltipClass: 'form__tooltip',
      tooltipText: 'Please re-enter your password',
      checkWidth: true,
      minWidth: 6,
    },
  ],
}

export const signin = {
  id: 'signin',
  name: 'signin',
  fillcontainer: 'signin-fillcontainer',
  fields: [
    {
      id: 'signin-email',
      type: 'email',
      label: 'Email',
      fieldref: 'email',
      required: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
    },
    {
      id: 'signin-password',
      type: 'password',
      label: 'Password',
      fieldref: 'password',
      required: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
      checkWidth: true,
      minWidth: 6,
    },
  ],
}

export const vocabData = {
  id: 'vocab',
  name: 'vocab',
  fillcontainer: 'vocab-fillcontainer',
  fields: [
    {
      id: 'vocab-word',
      type: 'string',
      label: 'Text',
      fieldref: 'word',
      required: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
      requiredClass: 'leitner-input-required',
      blur: 'getVocab',
    },
    {
      id: 'vocab-voice',
      type: 'select',
      label: 'Voice',
      fieldref: 'voice',
      required: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
      requiredClass: 'leitner-input-required',
      optionKey: 'name',
      opionValue: 'text',
    },
    {
      id: 'vocab-translation',
      type: 'texarea',
      label: 'Translation',
      fieldref: 'translation',
      required: true,
      inputClass: 'form__text',
      labelClass: 'form__label',
      rows: 3,
      requiredClass: 'leitner-input-required',
    },
    {
      id: 'vocab-example',
      type: 'texarea',
      label: 'example',
      fieldref: 'example',
      required: false,
      inputClass: 'form__text',
      labelClass: 'form__label',
      rows: 5,
    },
  ],
}

export const TEST_DATA = [
  {
    id: '1',
    word: 'Hi',
    translation: 'Greeting',
    example: 'test test test',
    answerOptions: [
      {
        id: 'test1',
        translation: 'Greeting1',
      },
      {
        id: 'test2',
        translation: 'Greeting2',
      },
      {
        id: 'test3',
        translation: 'Greeting3',
      },
      {
        id: 'test4',
        translation: 'Greeting4',
      },
    ],
  },
  {
    id: '2',
    word: 'Goodby',
    translation: 'See you',
    example: 'See you tomorrow',
    answerOptions: [
      {
        id: 'test1',
        translation: 'See you2',
      },
      {
        id: 'test2',
        translation: 'See you',
      },
      {
        id: 'test3',
        translation: 'See you3',
      },
      {
        id: 'test4',
        translation: 'See you4',
      },
    ],
  },
]
