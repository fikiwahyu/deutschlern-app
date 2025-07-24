import { Code, Database, Globe, Zap } from "lucide-react";

export const SIMULATIONS = [
  {
    id: "debugging-js",
    title: "JavaScript Debugging Challenge",
    description: "Debug real-world JavaScript applications with common issues",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "45 min",
    participants: 1243,
    rating: 4.8,
    skills: ["Debugging", "Problem Solving", "JavaScript"],
    icon: Code,
    color: "bg-yellow-500",
    scenarios: 5,
    completed: false,
  },
  {
    id: "react-performance",
    title: "React Performance Optimization",
    description:
      "Learn to identify and fix performance bottlenecks in React apps",
    category: "Framework",
    difficulty: "Advanced",
    duration: "60 min",
    participants: 856,
    rating: 4.9,
    skills: ["React", "Performance", "Optimization"],
    icon: Zap,
    color: "bg-blue-500",
    scenarios: 7,
    completed: true,
  },
  {
    id: "database-design",
    title: "Database Design Simulation",
    description:
      "Design efficient database schemas for various business requirements",
    category: "Database",
    difficulty: "Advanced",
    duration: "90 min",
    participants: 654,
    rating: 4.7,
    skills: ["SQL", "Database Design", "Normalization"],
    icon: Database,
    color: "bg-green-500",
    scenarios: 4,
    completed: false,
  },
  {
    id: "web-security",
    title: "Web Security Assessment",
    description:
      "Identify and fix security vulnerabilities in web applications",
    category: "Security",
    difficulty: "Expert",
    duration: "75 min",
    participants: 432,
    rating: 4.6,
    skills: ["Security", "Penetration Testing", "OWASP"],
    icon: Globe,
    color: "bg-red-500",
    scenarios: 6,
    completed: false,
  },
];

export const SAMPLE_SIMULATION_STEPS = [
  {
    id: 1,
    title: "Scenario Setup",
    description:
      "You are working on an e-commerce website that has been experiencing slow page loads",
    type: "info",
    content: `
// Current component implementation
function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // This effect runs on every render!
  useEffect(() => {
    const filtered = products.filter(product => 
      product.price < 100 && product.inStock
    );
    setFilteredProducts(filtered);
  });
  
  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
    `,
    hint: "Look carefully at the useEffect hook - what's missing?",
  },
  {
    id: 2,
    title: "Identify the Issue",
    description:
      "What is causing the performance problem in this React component?",
    type: "question",
    options: [
      "Missing dependency array in useEffect",
      "Using filter inside useEffect",
      "Not using useMemo for expensive calculations",
      "Missing key prop in map function",
    ],
    correctAnswer: 0,
    explanation:
      "The useEffect is missing a dependency array, causing it to run after every render and creating an infinite loop.",
  },
  {
    id: 3,
    title: "Apply the Fix",
    description: "Fix the component to resolve the performance issue",
    type: "code",
    expectedSolution: "useEffect(() => { ... }, [products]);",
    template: `
function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Fix this useEffect
  useEffect(() => {
    const filtered = products.filter(product => 
      product.price < 100 && product.inStock
    );
    setFilteredProducts(filtered);
  }___); // Add the missing part here
  
  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
    `,
  },
  {
    id: 4,
    title: "Test the Solution",
    description:
      "Your fix has been applied. The component now renders correctly without performance issues.",
    type: "result",
    success: true,
    feedback:
      "Excellent! By adding the dependency array [products], the effect now only runs when the products prop changes.",
  },
];
