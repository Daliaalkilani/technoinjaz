# Classical TF-IDF baselines using the same stratified 5-fold protocol as arabic_inquiries_bert_v2_5cv.py
# Usage: python paper/baselines_tfidf.py University_Student_Inquiries_Dataset_new3.csv baselines.json
import sys, json, numpy as np, pandas as pd
from sklearn.model_selection import StratifiedKFold, StratifiedShuffleSplit
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline, make_union
from sklearn.svm import LinearSVC
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
df = pd.read_csv(sys.argv[1])
texts = df.text.astype(str).values; labels = df.label.values
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
def feats(): return make_union(TfidfVectorizer(analyzer='word', ngram_range=(1,2), sublinear_tf=True, min_df=1),
                              TfidfVectorizer(analyzer='char_wb', ngram_range=(2,5), sublinear_tf=True, min_df=2))
models = {
 'TF-IDF + Multinomial NB': lambda: make_pipeline(TfidfVectorizer(analyzer='word', ngram_range=(1,2)), MultinomialNB(alpha=0.1)),
 'TF-IDF + Logistic Regression': lambda: make_pipeline(feats(), LogisticRegression(C=10, max_iter=3000)),
 'TF-IDF + Linear SVM': lambda: make_pipeline(feats(), LinearSVC(C=1.0)),
}
out = {}
for name, mk in models.items():
    accs, f1s, ps, rs = [], [], [], []; err = 0
    for tr, te in skf.split(texts, labels):
        st, sl = texts[tr], labels[tr]
        sss = StratifiedShuffleSplit(n_splits=1, test_size=0.1, random_state=42)
        sub, _ = next(sss.split(st, sl))
        m = mk().fit(st[sub], sl[sub]); p = m.predict(texts[te]); y = labels[te]
        accs.append(accuracy_score(y,p)); f1s.append(f1_score(y,p,average='macro'))
        ps.append(precision_score(y,p,average='macro')); rs.append(recall_score(y,p,average='macro')); err += (p!=y).sum()
    out[name] = dict(acc=np.mean(accs), acc_sd=np.std(accs), f1=np.mean(f1s), f1_sd=np.std(f1s), prec=np.mean(ps), rec=np.mean(rs), errors=int(err))
    print(name, {k: round(v,4) if isinstance(v,float) else v for k,v in out[name].items()})
json.dump(out, open(sys.argv[2],'w'), indent=1, default=float)
