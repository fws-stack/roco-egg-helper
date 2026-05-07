Component({
  properties: {
    mode: {
      type: String,
      value: 'forward' // 'forward' | 'reverse'
    },
    results: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean,
      value: false
    },
    parentAName: {
      type: String,
      value: ''
    },
    parentBName: {
      type: String,
      value: ''
    },
    childName: {
      type: String,
      value: ''
    }
  },

  data: {
    hasProbability: false
  },

  observers: {
    'results'(results) {
      const hasProb = results.some(r => r.probability != null);
      this.setData({ hasProbability: hasProb });
    }
  }
});
