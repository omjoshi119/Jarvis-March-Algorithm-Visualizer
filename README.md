# Jarvis-March (Gift Wrapping) Algorithm Visualizer

An interactive and educational visualizer for the **Jarvis-March Algorithm**, also known as the **Gift Wrapping Algorithm**, used to compute the convex hull of a set of 2D points.

This project is designed to help users **learn and explore** the algorithm through a rich, hands-on interface that brings its intuition and step-by-step process to life.

---

##  Access the visualizer [here](https://your-username.github.io/Jarvis-March-Algorithm-Visualizer).

## Features

- **Plot Points** – Click to add points to the canvas.
- **Edit Freely** – Add, remove, or **drag points** in real time.
- **Animated Visualization** – Watch the algorithm build the convex hull step by step.
- **Adjust Speed** – Control the pace of the animation.
- **Random Generator** – Generate random point sets with one click.
- **Play / Pause / Reset** – Full control over the visualization playback.
- **Pseudocode** – Clean, easy-to-follow pseudocode alongside the demo.
- **Complexity Analysis** – Understand time and space complexity of the algorithm.

---

## About the Algorithm

The **Jarvis-March Algorithm** is a simple method for finding the convex hull of a set of points in 2D space. It works by selecting the leftmost point and “wrapping” around the set in a counterclockwise direction, always choosing the next point that is the most outward.

Despite its **O(nh)** time complexity (where `n` is the number of points and `h` is the number of hull vertices), it's highly **intuitive** and well-suited for educational visualization.

---


## Pseudocode

```
1. Start with the leftmost point (guaranteed to be on the hull).
2. Initialize current point as the starting point.
3. Repeat:
   a. Add current point to the convex hull.
   b. For each candidate point:
      - Find the point that is the most counterclockwise with respect to the current point.
   c. Set the most counterclockwise point as the new current point.
4. Until the starting point is reached again.
```

## Structure of the Visualizer

- **Introduction**: What the algorithm is and why it matters.
- **Guided Example**: Step-by-step walkthrough with a small point set.
- **Interactive Canvas**: Fully controllable visualization space.
- **Pseudocode Block**: Helps connect the animation to actual logic.
- **Complexity Analysis**: Covers both time and space implications.

---

## Tech Stack

- **HTML5 Canvas** for rendering
- **JavaScript / TypeScript** for logic and interactivity
- **CSS** for styling
- Optional: **React** or **Vue** (if planning to modularize the interface)

---

## Time & Space Complexity

| Measure           | Complexity       |
|------------------|------------------|
| Time (Worst Case) | O(nh)            |
| Space             | O(n)             |

Where `n` is the total number of input points, and `h` is the number of points on the convex hull.

---

## Contributions

If you have any suggestions or would like to contribute to the project, feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for more details.

---

## Acknowledgments

- Inspired by the beauty of computational geometry and the joy of interactive learning 
- Developed as an educational tool to support visualization-based learning.
- Algorithmic concepts based on standard implementations of Jarvis-March.

