<!--
FILE: 02-article.md | PURPOSE: Published article content
-->

SEO Title: How Do AI Models Predict the Next Word? From N-gram to Transformers

Meta Description: A practical explanation of how the next word or token is predicted in language models, from N-gram, RNN, and LSTM to Transformers, with generation strategies, the challenges of the Arabic language, and the Jais and ALLaM models.

Suggested Slug: next-token-prediction

# How Do AI Models Predict the Next Word? From N-gram to Transformers

**Generative language models rest on a task that looks deceptively simple: estimating what is most likely to come after the current context.** But in modern models, it is often more accurate to say **next token prediction** rather than literally "the next word," because text is usually split into units called tokens, and a token may be a whole word, part of a word, a punctuation mark, or another unit.

From this core idea, language modeling systems evolved across several generations: starting with statistical models such as N-grams, then moving to recurrent neural networks (RNNs and LSTMs), and arriving at Transformers and modern large language models.

The real leap was not only in changing the underlying question, but in **how context is represented**: from counting preceding words, to compressing history into a hidden state, and then to using attention to relate parts of the context to one another directly and far more parallelizably.

## What Does Predicting the Next Word Mean?

In its simplest form, if we have the context:

> The student went to the ...

the model tries to estimate a probability distribution over the word or token that might follow.

It might give, for example:

- the university: 0.42
- the school: 0.23
- the house: 0.12
- other words: lower probabilities

A generation algorithm is then used to pick the next output.

Mathematically, the goal is to estimate the probability of the next element given the previous ones:

`P(x_t | x_1, x_2, ..., x_{t-1})`

And by repeating the process element after element, the model can generate a sentence, a paragraph, or a long text.

But there is an important difference between **the model** and **the generation method**:

- The model produces a probability distribution.
- The decoding strategy decides how we choose from that distribution.

This difference explains why the same model can give highly deterministic answers under Greedy Search, or more varied ones under Sampling.

## Why Do We Say Next Token Rather than Next Word in Modern Models?

Traditional N-gram systems may indeed operate at the word level. But modern language models usually use smaller units called tokens.

For instance, an Arabic word may be stored as a single token, or split into several tokens depending on the tokenizer and the vocabulary it was trained with.

This design helps the model handle:

- Rare words.
- New words.
- Different inflections.
- Proper names.
- Multiple languages.
- Shared word pieces.

References on Causal Language Modeling clarify that the task in causal generative models is to predict the next token in a token sequence, with the model prevented from seeing future tokens during prediction.

This is why "predicting the next word" is a useful simplification, but **Next Token Prediction is the technically more accurate phrasing when discussing modern LLMs**.

## How Does a Sentence Go from Text to a Next-Token Prediction?

The pipeline can be simplified into six stages:

**Text → Tokenization → Embeddings → Context Processing → Logits/Softmax → Decoding**

![Stages of next-token prediction: splitting "the student went to the" into tokens, then numeric IDs, then embeddings, then context processing in a Transformer, then Logits, Softmax, and a probability distribution led by "the university" at 0.42](/images/articles/body/next-token-prediction-3.avif "From text to a probability distribution: the tokens and numbers are illustrative, and the model does not pick a word but produces a probability for every token; the decoding strategy then decides what gets chosen — Illustration: Techno Enjaz")

### 1. Tokenization: Splitting Text into Tokens

The model does not work with the raw sentence directly.

It first splits it into tokens.

The units may be:

- Whole words.
- Parts of words.
- Common tokens.
- Characters or smaller units, depending on the system.

Using Subword Tokenization such as BPE or SentencePiece helped models handle large vocabularies and rare words without storing every possible word as a separate entry.

And in Arabic this stage becomes more important because of the language's rich morphological and derivational structure — we will return to this point later.

### 2. Converting Tokens into Numbers

After splitting the text, each token receives a numeric ID, the Token ID.

But a number like `4312` carries no semantic meaning in itself, so it is converted into a numeric vector through an Embedding layer.

An important correction to a common oversimplification here: **two words similar in meaning are not necessarily close to each other automatically in the initial embedding table**. Meaning and context take shape through training and the model's layers, and the contextual representations inside the network become far richer than a mere initial lookup vector.

### 3. Context Processing

This is where the main generations of models differ.

- N-gram relies on counts.
- RNN relies on an accumulated hidden state.
- LSTM adds memory and gates.
- Transformer uses Self-Attention.

### 4. Producing Logits

In the end, the model produces a score for every candidate token in the vocabulary.

These scores are called logits, and they are not yet probabilities.

### 5. Converting Scores into Probabilities

Softmax is used to convert the scores into a probability distribution whose elements sum to 1.

### 6. Selecting the Token

Once we have the probabilities, the decoding stage begins:

- We take the highest directly.
- Or we keep several paths.
- Or we sample probabilistically.
- Or we use Top-k / Top-p / Temperature.

So generation does not end at Softmax; **how we choose from the distribution is an essential part of the model's final behavior**.

# How Did N-gram Models Begin?

N-grams are among the simplest statistical language models.

The idea is to approximate the probability of the current word using a limited number of preceding words rather than the full history.

With a trigram, prediction depends on the last two words.

Example: suppose a simple corpus:

- I love drinking tea
- I love drinking coffee
- I love traveling
- I love drinking tea in the morning

And we want to predict what comes after:

> I love drinking ...

The context "I love drinking" appeared three times:

- Twice before "tea".
- Once before "coffee".

Therefore:

`P(tea | I love drinking) = 2/3`

And:

`P(coffee | I love drinking) = 1/3`

The model picks "tea" if we use the highest probability.

## What Is N-gram's Strength?

Its core strengths are:

- Simplicity.
- Ease of understanding.
- Fast computation at small scales.
- No neural network required.
- The reason behind a probability can be explained easily.

But it suffers from serious problems.

## What Is the Data Sparsity Problem?

If a given sequence never appears in the training data, raw Maximum-Likelihood estimation may assign zero probabilities to some events. That is why techniques such as Smoothing and Backoff were historically used to spread some probability over unobserved events.

The problem grows as N increases, because the number of possible combinations explodes.

In Arabic, the abundance of inflections, clitics, and forms increases the number of surface forms of words, which can aggravate data sparsity if the system operates on whole words.

## Why Doesn't N-gram Understand Distant Context?

If the model is a trigram, it looks only at the last two words.

It may therefore fail to capture a relation that depends on a word appearing tens of words earlier.

This limitation pushed researchers toward models that could represent history more flexibly.

# How Did the RNN Change Context Processing?

A Recurrent Neural Network does not rely on a fixed window of words.

Instead, it passes a hidden state from step to step.

At each step, the network uses:

- The current token.
- The previous hidden state.

and then produces a new hidden state.

In simplified form:

`h_t = f(W_h h_{t-1} + W_x x_t + b)`

And `h_t` carries a compressed representation of everything the network has processed up to that moment.

In theory, this allows the entire previous context to influence the prediction. In practice, preserving distant information was hard.

![RNN diagram before and after unrolling through time, where the hidden state h passes from step to step](/images/articles/body/next-token-prediction-1.avif "Unrolling an RNN through time: at each step x_t enters and the hidden state h_t is updated based on h_{t-1} — Source: fdeloche, Wikimedia Commons, CC BY-SA 4.0")

## What Is the Vanishing Gradient Problem?

RNNs are usually trained with Backpropagation Through Time.

When the error is propagated across many steps, gradients may become tiny, so old words lose their influence on the model's update.

This is known as Vanishing Gradient.

Practically, this means the network may remember short context well but struggle to learn distant dependencies, even though its architecture theoretically permits them.

# What Did LSTM Add?

Long Short-Term Memory appeared in 1997 to address the difficulty of learning long-range dependencies in recurrent networks.

LSTM adds a Cell State and control mechanisms called Gates.

The best known:

- Forget Gate.
- Input Gate.
- Output Gate.

These gates help the unit determine:

- What should be kept.
- What can be forgotten.
- What new information enters.
- What passes to the hidden state.

With this, LSTM became more capable than a plain RNN at holding important information over longer spans.

But it did not solve another major problem: **processing remained largely sequential**.

All positions of a sentence cannot be processed in the same parallel fashion that later became possible with Transformers.

# What Did Transformers Change?

In 2017, the paper **Attention Is All You Need** presented the Transformer architecture, which abandoned recurrence in the proposed architecture and relied on attention.

But there is an important detail:

**The original Transformer in the paper was an encoder–decoder aimed primarily at tasks like translation.**

Generative models of the GPT family use a **Decoder-only Transformer** design, or designs derived from it, with Causal Masking to keep every position from seeing future tokens during generative training.

![GPT architecture diagram of the Decoder-only Transformer type showing Embedding layers, Transformer blocks, Multi-Head Attention details with a Mask step, then Softmax at the output](/images/articles/body/next-token-prediction-2.avif "GPT architecture (Decoder-only): successive Transformer blocks, each containing Multi-Head Attention with a causal mask, then Linear and Softmax to predict the next token — Source: Marxav and Mrmw, Wikimedia Commons, CC0")

This point matters because the phrase "Transformers predict the next word" is true in the context of modern causal models, but it is not an accurate description of every Transformer in existence.

## What Is Self-Attention?

Instead of compressing all of history into a single state the way an RNN does, Self-Attention lets every position compute its relation to other positions in the context it is allowed to see.

The mechanism starts from three representations:

- Query (Q)
- Key (K)
- Value (V)

And the core formula for Scaled Dot-Product Attention is:

`Attention(Q,K,V) = softmax(QKᵀ / √d_k) V`

The simplified idea:

1. The Query represents what the current position is looking for.
2. The Keys help measure the importance of other positions.
3. The Values carry the information that will be merged.
4. Softmax converts relation scores into weights.
5. The model produces a weighted blend of the information.

## What Distinguishes Causal Attention?

In Autoregressive Generation, the current token is not allowed to look into the future.

If the sequence is:

> Artificial intelligence helps to ...

then when training the model to predict the fourth element, it can see only what precedes it, not the correct answer sitting later in the text.

This is enforced with a Causal Mask.

This is the mechanism that makes training consistent with how the model is used afterward: predicting the next element from the previous ones.

## Why Did Transformers Beat RNNs in Large Language Models?

The main reasons:

- Positions can be processed with far more parallelism during training compared to RNNs.
- Distant relations are represented directly through attention.
- Scalability to huge models and datasets.
- Multi-Head Attention allows learning multiple kinds of relations.
- They combine easily with large-scale training techniques.

This evolution paved the way for large autoregressive models such as GPT and others.

# Does the Model "Understand" or Merely Compute Probability?

At the level of the core training objective, the model learns to estimate token probabilities.

But reducing the behavior of large models to the phrase "just picking the most probable word" is inaccurate for two reasons.

First, the model builds complex internal representations of context during training, and these representations can support tasks such as reasoning, summarization, translation, and question answering.

Second, the model does not always pick the highest-probability option; the decoding method may use sampling, and model behavior also depends on the context, post-training, alignment, and the tools in use.

So the more precise statement is:

> A generative model produces a probability distribution over the next token based on a learned representation of context, and the generation strategy then determines how the actual output is selected.

# What Is the Difference Between Training and Generation?

This is one of the most confusing points.

## During Training

The system knows the true text and is trained to raise the probability of the correct token.

For example:

> I visited the city of Damascus in ...

If the true next element is "summer," a loss is computed measuring how far the model's distribution is from the target.

The weights are then updated using optimization algorithms based on Gradient Descent.

## During Inference

There is no known correct answer.

The model gives a distribution such as:

- summer 0.28
- Syria 0.17
- the year 0.11
- winter 0.09
- ...

The decoding strategy then determines what gets selected.

After a token is chosen, it is appended to the context, and the process repeats.

# What Are the Best-Known Text Generation Strategies?

## Greedy Search

At each step it picks the highest-probability token.

Its advantages:

- Simple.
- Deterministic.
- Relatively fast.

But it can produce predictable or repetitive text, and it does not guarantee that the locally best decision at each step leads to the best overall sequence.

## Beam Search

Keeps several candidate paths instead of just one.

It is used a lot in constrained sequential tasks, but it is not the ideal choice for every form of open-ended writing. Neural text generation research has shown that increasing the focus on likelihood maximization alone can produce less natural text in some open-ended generation tasks.

## Temperature

Temperature reshapes the probability distribution before sampling.

Generally:

- Lower temperature → a sharper distribution and more conservative results.
- Higher temperature → a flatter, more varied distribution.

Temperature is not literally a "creativity dial"; it is a parameter that affects the probability distribution and hence the likelihood of choosing less-preferred tokens.

## Top-k

We keep the highest `k` tokens by probability and sample from them.

If `k=50`, everything outside the top 50 is discarded.

## Top-p or Nucleus Sampling

Instead of a fixed count, we choose the smallest set of tokens whose probabilities sum to a value such as `p=0.9`.

The candidate set's size thus changes with the model's confidence.

![Comparison of Top-k with k=3 and Top-p with p=0.9 on a single probability distribution over eight tokens: the first keeps three tokens, the second keeps five until the cumulative sum reaches 0.90](/images/articles/body/next-token-prediction-4.avif "Top-k keeps a fixed number of candidates, while Top-p keeps the smallest set whose probabilities sum to p, so its size changes with the model's confidence — Illustration: Techno Enjaz")

# Why Is Arabic a Special Challenge for Predictive Models?

The issue is not that Arabic is "difficult" in general, but that it has properties the system must handle appropriately in the data, encoding, and evaluation.

## 1. Morphological and Derivational Richness

A single Arabic word can contain:

- A conjunction.
- A preposition.
- A definite article.
- A root.
- A pattern (an awzan, or derivational template).
- Pronouns or suffixes.

For example:

> wa-bi-kitābihim ("and with their book")

may carry several linguistic units inside the same written form.

![Morphological segmentation of the word "wa-bi-kitābihim" into the conjunction waw, the preposition ba, the noun "book", and the pronoun "them", with a comparison of three ways to tokenize it: one token for the whole word, a hypothetical statistical split, and a morphology-aware split](/images/articles/body/next-token-prediction-5.avif "A single Arabic word may carry a conjunction, a preposition, a noun, and a pronoun; and how it is split into tokens affects vocabulary size and root sharing across words (the statistical split here is a hypothetical example) — Illustration: Techno Enjaz")

For this reason, treating every surface form as an independent unit can produce a huge vocabulary and higher data sparsity.

Arabic NLP research has long confirmed that tokenization and morphological processing are central to processing Arabic.

## 2. Non-Concatenative Morphology

Arabic is not merely a language that uses prefixes and suffixes.

A significant part of its morphology relies on **the root and the pattern**, meaning changes can occur inside the structure of the word itself.

This challenges segmentation algorithms that fundamentally rely on statistically merging or splitting adjacent segments.

2025 research on non-concatenative languages clarified that conventional subword algorithms may not always represent root-and-pattern structure naturally.

## 3. The Absence of Diacritics in Most Texts

Ordinary Arabic text is usually written without short vowel marks.

The same written form can therefore admit more than one reading or meaning.

Context is what helps the model narrow the possibilities.

## 4. Diglossia and Dialects

The Arabic-speaking world uses:

- Modern Standard Arabic.
- Multiple local dialects.
- Intermediate levels.
- Code-switching between Arabic and English, French, or others.

Recent studies on code-switched Arabic indicate that the Arabic linguistic environment is multilayered in a way that makes building models, data, and evaluation more complex than treating "Arabic" as a single homogeneous kind.

## 5. Informal Writing Variation

Especially on social media we find:

- Spelling variations.
- Letter stretching.
- Arabizi.
- Foreign words.
- Dialects with no fixed spelling standard.
- Code-switching within the same sentence.

This raises the difficulty of tokenization, normalization, and prediction.

# Is a "Morphological" Tokenizer Enough to Solve Arabic?

**No.**

This is a point that emerged more clearly in 2025 and 2026 research.

Earlier studies showed that adding morphological information to tokenization can improve Arabic representations and some tasks.

The MorphBPE paper at ACL 2026 reported results indicating that morphology-aware tokenization can improve morphological consistency and reduce language model cross-entropy, with gains in Arabic reading comprehension within its experimental settings.

But another study at LREC 2026 examined root-and-pattern representation across seven Arabic and multilingual models and tokenizers, and found that **alignment between a tokenizer's segmentation and morphological structure is neither a necessary nor, by itself, a sufficient condition for the model to generate morphological forms well**.

The takeaway:

> Arabic quality is not determined by the tokenizer alone; it intertwines with the data, model size, training architecture, dialect distribution, evaluation quality, and post-training.

# How Have Modern Arabic Models Evolved?

## Jais

Jais appeared in 2023 as a family of generative models centered on Arabic and English, with a base model and a chat version.

The base version published in the paper was 13 billion parameters and used a Decoder-only architecture derived from GPT-3, trained on a mixture of Arabic, English, and code.

Later, the Jais family expanded to different sizes and contexts.

## Jais 2

In December 2025, Inception, Cerebras, and MBZUAI announced Jais 2, a newer generation of open-weight Arabic models.

The published materials describe the family as designed from the ground up for strong performance in Modern Standard Arabic and dialects, with greater attention to cultural and linguistic diversity.

In 2026, a detailed technical paper for the Jais 2 family appeared, covering versions up to 70 billion parameters, with a customized Arabic vocabulary and comparisons on Arabic and cultural benchmarks.

## ALLaM

ALLaM is a family of language models focused on Arabic and English.

The technical paper published in 2024 clarifies that it uses a Decoder-only autoregressive architecture, and covers vocabulary extension, training on an Arabic-English mixture, and knowledge transfer between the two languages, plus later alignment with human preferences.

The important point is not ranking Jais and ALLaM as the "best model," but that both exemplify Arabic NLP's shift from merely using multilingual models to **designing and training models centered on Arabic itself**.

# How Do We Compare N-gram, RNN, LSTM, and Transformer?

| Model | Context Representation | Key Strength | Key Limitation |
|---|---|---|---|
| N-gram | Last N−1 elements | Simple and interpretable | Data sparsity and limited context |
| RNN | Accumulated Hidden State | Longer context than N-gram | Distant dependencies and sequential processing |
| LSTM | Hidden State + Cell State + Gates | Better memory for long relations | Still relatively sequential |
| Transformer | Self-Attention | Direct relations, better parallelism, scalability | Cost of conventional attention rises with context length |
| Decoder-only LLM | Causal Self-Attention + broad training | Broadly capable text generation | Training/inference cost, data quality, hallucination, context limits |

# Is Next Token Prediction Enough to Build an Advanced Language Model?

Training on Next Token Prediction is a very important foundation for Autoregressive generative models, but it is not the whole story.

Modern models may also pass through stages such as:

- Pretraining.
- Instruction Tuning.
- Supervised Fine-Tuning.
- Preference Optimization or other alignment methods.
- Tool use training.
- Safety tuning.
- Domain adaptation.

So the model an end user employs is not usually just a network whose training ended at predicting the next token on raw text.

Even so, next-element prediction remains **the core computational engine of step-by-step generation** in a large number of modern language models.

# What Are the Common Misconceptions About Next Word Prediction?

## "The model looks for the most commonly used word"

Not necessarily.

A simple N-gram depends heavily on counts, but a modern Transformer produces its probabilities based on a complex representation of context learned during training.

## "Every token is a word"

Wrong.

A token may be part of a word, a punctuation mark, or another unit.

## "The Transformer sees the whole future sentence when generating"

In Causal Language Models it does not; the Causal Mask prevents that.

## "Highest probability always gives the best text"

Not necessarily.

Greedy decoding may differ greatly from sampling, and research has shown that likelihood maximization alone is not always the best strategy for open-ended generation.

## "A morphological tokenizer = an excellent Arabic model"

Not sufficient.

Tokenization matters, but a model's quality depends on an entire stack including data, training, architecture, and evaluation.

## "Modern models predict one word and stop"

No.

The chosen token is appended to the context and the process repeats until the model reaches a stop condition or the generation limit.

# What Is the Future of Text Prediction in Arabic?

The direction of progress does not appear confined to adding parameters.

Several important axes:

- More efficient tokenization for Arabic.
- Better representation of morphology, roots, and patterns.
- Higher-quality dialect data.
- Handling code-switching.
- Open-weight Arabic models.
- Longer, more efficient context.
- More efficient attention techniques.
- Better Arabic and cultural evaluations.
- Reducing hallucination and improving grounding.
- Integrating tools and external retrieval (such as using [the MCP protocol standard](#article/model-context-protocol-mcp)).
- Smaller, more efficient models for local use and edge devices.

And recent research on Morphology-Aware Tokenization confirms the question is not settled; there is clear progress, but the relationship between token shape and actual linguistic capability is more complex than one simple rule.

# Conclusion

Next-word prediction began as a relatively simple statistical problem: counting what usually follows a short context.

With N-grams, context was a limited window.

With RNNs, history came to be compressed into a hidden state.

Then LSTM made holding distant information more stable.

Transformers moved the idea to a different level using attention and scalable context processing, and decoder-only Transformers became the foundation of a large number of modern generative language models.

But the more precise term today is usually **Next Token Prediction**, because the model does not necessarily deal in whole words.

For Arabic, the problem does not stop at translating an English model or adding Arabic words to a vocabulary. Morphology, dialects, diacritics, informal writing, code-switching, and the tokenization method all affect model efficiency.

This is why understanding "how does the model choose the next element?" is not merely an explanation of a small algorithm; it is an entry point into understanding how modern language models generate text step by step.

## Sources and References

1. Vaswani et al. (2017), Attention Is All You Need — https://arxiv.org/abs/1706.03762
2. Hochreiter & Schmidhuber (1997), Long Short-Term Memory — https://doi.org/10.1162/neco.1997.9.8.1735
3. Hugging Face, Causal Language Modeling — https://huggingface.co/docs/transformers/tasks/language_modeling
4. Sennrich, Haddow & Birch (2016), Neural Machine Translation of Rare Words with Subword Units — https://aclanthology.org/P16-1162/
5. Kudo & Richardson (2018), SentencePiece — https://arxiv.org/abs/1808.06226
6. Holtzman et al. (2020), The Curious Case of Neural Text Degeneration — https://arxiv.org/abs/1904.09751
7. Habash & Rambow (2005), Arabic Tokenization, POS Tagging and Morphological Disambiguation — https://aclanthology.org/P05-1071/
8. Alkaoud & Syed (2020), On the Importance of Tokenization in Arabic Embedding Models — https://aclanthology.org/2020.wanlp-1.11/
9. Gazit et al. (2025), Splintering Nonconcatenative Languages for Better Tokenization — https://aclanthology.org/2025.findings-acl.1151/
10. Asgari et al. (2026), MorphBPE: Morphology-Aware Tokenization for Efficient LLM Training — https://aclanthology.org/2026.findings-acl.2068/
11. Alakeel et al. (2026), Morphemes without Borders — https://aclanthology.org/2026.lrec-1.923/
12. Hamed et al. (2025), A Survey of Code-switched Arabic NLP — https://aclanthology.org/2025.coling-main.307/
13. Sengupta et al. (2023), Jais and Jais-chat — https://arxiv.org/abs/2308.16149
14. MBZUAI (2025), Release of Jais 2 — https://mbzuai.ac.ae/news-events/news/inception-cerebras-mbzuai-release-jais-2-the-next-generation-the-worlds-leading
15. Anwar et al. (2026), Jais 2 — https://arxiv.org/abs/2608.13580
16. Bari et al. (2024), ALLaM — https://arxiv.org/abs/2407.15390
