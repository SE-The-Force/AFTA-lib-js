from transformers import MT5ForConditionalGeneration, MT5Tokenizer

model_path = "/home/aben/projects/model"  # Update with the path to your fine-tuned model files

tokenizer = MT5Tokenizer.from_pretrained(model_path)
model = MT5ForConditionalGeneration.from_pretrained(model_path)

def generate_root_words(word):
    # Example usage
    input_text = "extract root: " + word
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    # Generate output
    output = model.generate(input_ids)
    output_text = tokenizer.decode(output[0], skip_special_tokens=True)

    return output_text

def analyze_words(words):
    results = []
    for word in words:
        root_word = generate_root_words(word)
        results.append(root_word)
    return results

if __name__ == '__main__':
    words = sys.argv[1:]
    root_words = analyze_words(words)
    print(root_words)
