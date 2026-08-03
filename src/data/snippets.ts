import type { ProgrammingLanguage } from '../types'

/**
 * Starter scratchpad code for the Playground, per language.
 *
 * The Playground previews output by pulling string literals out of print
 * calls — it does not execute code. Keep these snippets printing literal
 * strings so the simulated console stays coherent.
 */
export const playgroundSnippets: Record<ProgrammingLanguage, string> = {
  python: `# Scratchpad — write anything you like
print("Hello, World!")
print("Welcome to the Playground")
`,
  javascript: `// Scratchpad — write anything you like
console.log("Hello, World!");
console.log("Welcome to the Playground");
`,
  typescript: `// Scratchpad — write anything you like
console.log("Hello, World!");
console.log("Welcome to the Playground");
`,
  java: `// Scratchpad — write anything you like
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to the Playground");
    }
}
`,
  cpp: `// Scratchpad — write anything you like
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "Welcome to the Playground" << endl;
    return 0;
}
`,
  c: `// Scratchpad — write anything you like
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to the Playground\\n");
    return 0;
}
`,
}
