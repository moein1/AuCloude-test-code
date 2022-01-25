import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Vocab
interface VocabAttrs {
  word: string;
  translation: string;
  example: string;
  voice: string;
}

// An interface that describes the properties
// that a Vocab Model has
interface VocabModel extends mongoose.Model<VocabDoc> {
  build(attrs: VocabAttrs): VocabDoc;
}

// An interface that describes the properties
// that a Vocab Document has
interface VocabDoc extends mongoose.Document {
    word: string;
    translation: string;
    example: string;
    voice: string;
}

const vocabSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    example: {
        type: String
      },
      voice: {
        type: String,
        required: true,
      },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);


vocabSchema.statics.build = (attrs: VocabAttrs) => {
  return new Vocab(attrs);
};

const Vocab = mongoose.model<VocabDoc, VocabModel>("Vocab", vocabSchema);

export { Vocab };
