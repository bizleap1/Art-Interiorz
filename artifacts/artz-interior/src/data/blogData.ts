export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  readTime: string;
  date: string;
  image: string;
};

export const blogData = {
  hero: {
    title: "Design Journal",
    crumb: "Blog",
    image: "/assets/bedroom.jpg",
  },
  intro:
    "Notes, guides and inspiration from the Art Interiorz studio — on materials, modular kitchens, renovation, hospitality and the craft of living beautifully.",
  posts: [
    {
      slug: "thoughtful-home-design",
      title: "Where Dream Homes Begin with Thoughtful Design",
      excerpt:
        "How we approach every home — listening first, designing second, and shaping spaces around the way you actually live.",
      body: [
        "At Art Interiorz, we believe that a truly beautiful home begins long before the first sketch is drawn. It begins with a conversation — an honest, unhurried dialogue about how you live, what you love, and what you dream of coming home to every evening.",
        "Interior design is not simply about choosing colours and furniture. It is the art of translating a person's lifestyle, habits and aspirations into a physical environment. A home for a family with young children demands different priorities than a studio for a working professional. A space for a couple who love hosting requires a completely different flow than a serene retreat designed for quiet evenings.",
        "Our process always starts with listening. During your first consultation, we ask questions that might surprise you: How do you move through your home on a typical morning? Where do you find yourself lingering? Which spaces feel tight or awkward? What is the one thing you wish your home did better? These answers shape every decision that follows.",
        "Once we understand your daily rhythm, we begin space planning — the foundation of great interior design. Smart space planning determines how rooms connect, how natural light travels through a home, where storage is placed, and how traffic flows. A beautifully furnished room that feels cramped or awkward is a design failure; a simple, well-planned space feels effortlessly comfortable.",
        "We then develop a design concept that anchors the project — a colour palette, a material story, a mood. This concept thread connects every room, ensuring that while each space has its own character, the home feels coherent and whole. We create detailed 3D visualisations so you can see and feel your future home before a single wall is painted.",
        "The result is a home that does not just look stunning in photographs — it feels right every single day. That is the Art Interiorz approach: thoughtful, personal and always built around the way you actually live.",
      ],
      category: "Residential",
      readTime: "5 min read",
      date: "June 12, 2025",
      image: "/assets/livingroom.jpg",
    },
    {
      slug: "modular-kitchen-guide",
      title: "The Modular Kitchen Guide: L, U, Parallel & Open Layouts",
      excerpt:
        "A practical walkthrough of every modular kitchen layout — and how to choose the one that matches your home and habits.",
      body: [
        "The kitchen is the heart of the home — and yet it is often the most poorly planned space. Choosing the right layout for your modular kitchen is not about picking what looks best in a catalogue. It is about understanding how you cook, how many people use the kitchen simultaneously, and how the kitchen connects to the rest of your living space.",
        "The L-shaped kitchen is the most popular layout in Indian homes — and for good reason. It uses two adjoining walls efficiently, creating a natural work triangle between the sink, stove and refrigerator. L-shaped kitchens work brilliantly in medium-sized spaces and allow for an island or dining table extension in larger homes. They offer excellent workflow for a single cook and keep the cooking zone separate from the dining area.",
        "The U-shaped kitchen wraps around three walls and is ideal for serious home cooks. With three continuous counter surfaces, you get maximum storage and workspace. U-shaped kitchens suit larger kitchens — in smaller spaces, they can feel enclosed. The key is to ensure adequate aisle width (at least 900mm) between opposing counters so two people can work comfortably.",
        "The parallel (galley) kitchen places counters along two opposing walls. It is incredibly efficient — everything is within reach — and works exceptionally well in narrow, elongated kitchen spaces. Parallel kitchens are a favourite for high-traffic family kitchens because the layout keeps the cooking and cleaning zones clearly separated.",
        "The open kitchen — where the cooking area opens directly into the living or dining space — is increasingly popular in modern Indian apartments. Open kitchens create a sociable, connected atmosphere and make smaller homes feel larger. The trade-off is that cooking smells and sounds carry through the home, so a powerful chimney and careful storage planning are essential.",
        "Beyond the layout, the material choices for your modular kitchen matter enormously. At Art Interiorz, we recommend marine-grade plywood for carcasses, premium laminates or lacquered finishes for shutters, and quartz or granite for countertops. Hardware quality is equally critical — choose soft-close hinges and drawer channels from trusted brands like Hettich or Hafele for long-lasting reliability.",
        "Whatever layout you choose, the most important principle is this: design your kitchen for the cook, not the camera. A modular kitchen that is beautiful but inconvenient to use is not a good kitchen. Work with your designer to map out your specific workflow, and let that workflow drive every decision.",
      ],
      category: "Kitchen",
      readTime: "7 min read",
      date: "May 28, 2025",
      image: "/assets/kitchen.jpg",
    },
    {
      slug: "home-renovation-nagpur",
      title: "Home Renovation in Nagpur: A Stress-Free Roadmap",
      excerpt:
        "Renovation can feel daunting. We share the exact step-by-step process we use to make it seamless for our clients.",
      body: [
        "Home renovation is one of the most significant investments you will make — and one of the most stressful, if not planned carefully. At Art Interiorz, we have refined our renovation process over nine years and hundreds of projects to make it as smooth, transparent and enjoyable as possible.",
        "The first step is always a thorough site assessment. Before any design work begins, we visit your home to understand its current state — the condition of walls, flooring, plumbing and electrical systems. Renovation surprises (like discovering outdated wiring or plumbing behind walls) are common in older Nagpur homes, particularly in areas like Dharampeth, Civil Lines and Shilpa Nagar. Identifying these issues upfront prevents costly disruptions mid-project.",
        "Once we have a clear picture of the site, we develop a detailed scope of work — a document that specifies exactly what will be done, to what standard, with what materials. A clear scope is your single most important protection against cost overruns and scope creep. We share this with you before any work begins, and nothing happens without your explicit approval.",
        "Material selection comes next, and we guide you through every decision — from floor tiles and wall paint to lighting fixtures and hardware. We have long-standing relationships with premium material suppliers across Nagpur and can often secure better pricing than retail. We also maintain a curated selection of sustainable and locally sourced materials for clients who value environmental responsibility.",
        "During execution, a dedicated project manager oversees the site every single day. They coordinate between the civil team, electricians, plumbers, carpenters and painters — ensuring that each trade is sequenced correctly and that work meets our quality standards at every stage. Daily progress photos are shared with you so you are never in the dark.",
        "We maintain a strict timeline and conduct weekly progress reviews with you. Any variations from the original scope — additions or changes requested mid-project — are documented in writing with cost and time implications clearly stated before proceeding.",
        "The final stage is the handover walkthrough, where we go through every room together, check every detail, and compile a snagging list of any outstanding items. We believe that our job is not complete until you are genuinely delighted with every corner of your renovated home.",
      ],
      category: "Renovation",
      readTime: "6 min read",
      date: "April 18, 2025",
      image: "/assets/Blog/Home-renovation.jpg",
    },
    {
      slug: "hospitality-design-essentials",
      title: "Hospitality Design Essentials: Lobbies, Lighting & Lasting Impressions",
      excerpt:
        "The five principles we apply to every hotel, restaurant and lounge — where ambience meets utility.",
      body: [
        "In hospitality design, the stakes are uniquely high. A guest's first impression of a hotel or restaurant is formed within seconds — before they have spoken to a single member of staff, before they have tasted the food or rested in the room. That first impression is entirely environmental, shaped by what they see, feel and sense the moment they walk through the door.",
        "The lobby or entrance is the most critical space in any hospitality project. It sets the tone, communicates the brand's values and determines how the guest feels before anything else happens. We design lobbies with a clear hierarchy: a striking focal element (a feature wall, a sculptural lighting installation, a curated art piece) that commands attention, surrounded by a carefully considered supporting cast of materials, textures and light.",
        "Lighting is the single most powerful tool in hospitality design — and the most frequently misunderstood. Flat, bright lighting kills atmosphere. Layered lighting — ambient, accent and task — creates depth and drama. For hotel lobbies, we typically use warm-toned (2700-3000K) pendant and wall-wash lighting at low levels, punctuated by focused accent lights on artwork or architectural features. For restaurants, the lighting level should be bright enough to see the menu but intimate enough to make every table feel like a private corner.",
        "Material durability is a non-negotiable in hospitality design. Unlike residential spaces, hospitality environments endure extraordinary wear — hundreds of guests daily, continuous cleaning, and the inevitable spills and impacts of commercial use. We specify materials that are beautiful under close inspection but built to perform over years of heavy use: porcelain that looks like natural stone, high-pressure laminates with genuine wood grain, commercial-grade carpet tiles that can be replaced section by section.",
        "Acoustic comfort is the often-overlooked hospitality essential. A beautiful restaurant that is unbearably loud because of hard surfaces and high ceilings will fail, regardless of its design credentials. We build acoustic strategy into every hospitality project — ceiling panels, upholstered banquettes, soft flooring in strategic zones — to ensure that ambient noise stays at a level where conversation is effortless.",
        "Finally, great hospitality design respects the operational reality of the business. A beautiful bar that is difficult to service, or a restaurant layout that creates chaos during peak hours, is a design failure. We work closely with operations teams to understand traffic flow, service sequences and back-of-house requirements, ensuring that beauty and functionality coexist seamlessly.",
      ],
      category: "Hospitality",
      readTime: "8 min read",
      date: "March 22, 2025",
      image: "/assets/Blog/Hospitality-Interior-Designers.jpg",
    },
    {
      slug: "3d-visualisation",
      title: "Why We Use 3D Visualisations on Every Project",
      excerpt:
        "See it before you build it — how immersive 3D walkthroughs help our clients sign off with total confidence.",
      body: [
        "One of the most common anxieties our clients bring to their first consultation is this: 'How do I know I'll love it once it's done?' It is a completely understandable concern. Interior design decisions — colour choices, furniture configurations, material combinations — are enormously difficult to visualise from a mood board or fabric swatch alone.",
        "That is precisely why we invest in photorealistic 3D visualisations for every project at Art Interiorz. A high-quality 3D render allows you to walk through your future home before a single rupee has been spent on execution. You can see how the afternoon light falls across your living room floor, how the kitchen cabinetry looks against the chosen wall colour, and whether the furniture scale feels right in the actual room dimensions.",
        "The technology we use produces renders that are indistinguishable from photographs — accurate in material texture, light behaviour and spatial proportion. We model every room with the actual furniture pieces, lighting fixtures and decorative elements that will be specified, so what you see is genuinely what you get. Over nine years of using this process, our clients consistently report that the finished spaces match the 3D visualisations with remarkable accuracy.",
        "Beyond helping clients make confident decisions, 3D visualisation is an invaluable communication tool across our project team. Contractors, carpenters and painters can reference the renders directly, reducing the risk of misinterpretation. Disputes about 'that was not what I imagined' become extremely rare when everyone is working from the same photorealistic reference.",
        "We also use 3D renders as a budget-optimisation tool. If a client sees their future space and wants to modify an element — change the colour, swap a material, reconfigure a layout — we can make that change in the digital model in hours, rather than discovering the issue on site after work has begun. This iterative refinement process saves time, money and stress.",
        "Our design process includes a dedicated 3D review session at which we present the visualisations and walk you through the space virtually. We invite questions, encourage adjustments, and do not proceed to the execution phase until you have signed off with complete confidence. It is one of the most important investments we make in every project — and one of the most valued by our clients.",
      ],
      category: "Process",
      readTime: "4 min read",
      date: "February 14, 2025",
      image: "/assets/Blog/3D-visualization.jpg",
    },
    // {
    //   slug: "interior-design-cost-nagpur",
    //   title: "Interior Design Cost in Nagpur — A Transparent Breakdown",
    //   excerpt:
    //     "What actually drives the cost of interior design, and how we plan budgets that stay honest from concept to handover.",
    //   body: [
    //     "One of the most common questions we hear from clients considering interior design is: 'How much will this actually cost?' It is a fair question, and one that deserves a direct, transparent answer — not the vague 'it depends' that so many in our industry default to.",
    //     "Interior design costs in Nagpur vary significantly based on four primary factors: the scope of work, the quality of materials selected, the complexity of the design, and the execution timeline. A basic interior fit-out for a 2BHK apartment in Nagpur might range from ₹8–12 lakhs, while a premium full-home design with custom furniture and high-end finishes could reach ₹25–40 lakhs or more. These are broad ranges — your specific project will depend on your choices and priorities.",
    //     "The single biggest driver of cost is the material specification. The difference between a budget laminate and a premium European finish can be three to five times the price — and there are legitimate reasons for that difference in durability, aesthetics and tactile quality. A good designer will help you understand where it makes sense to invest more (high-touch surfaces like kitchen shutters and flooring) and where you can save (areas with less visual impact).",
    //     "Design and professional fees typically represent 10–15% of the total project budget at Art Interiorz. This covers the full design process: initial consultations, space planning, 3D visualisations, material specification, shop drawings and site supervision. Some studios charge lower design fees but recover margin on material markups — we prefer full transparency, so our material costs are at-market or below, and our design fee is clearly stated upfront.",
    //     "Civil work — plastering, tiling, waterproofing and structural modifications — is often underestimated in renovation budgets. In older Nagpur homes, particularly those built before 2000, civil surprises are common. We always recommend budgeting a 10–15% contingency above the estimated civil cost for renovation projects.",
    //     "Furniture and décor form the final category. Custom furniture typically costs more than catalogue pieces but fits your space perfectly and is built to your specification. We maintain relationships with skilled craftsmen across Nagpur and can deliver custom pieces at prices that are competitive with premium retail furniture.",
    //     "Our advice: be honest with your designer about your budget from day one. A good designer will work creatively within your budget — prioritising where it matters most and finding savings where it matters less. Budget surprises are almost always the result of scope creep or unclear communication at the start. At Art Interiorz, we commit to delivering your project within the agreed budget, and any variations require your written approval before proceeding.",
    //   ],
    //   category: "Guides",
    //   readTime: "9 min read",
    //   date: "January 30, 2025",
    //   image: "/assets/Blog/interior-design-cost.jpg",
    // },
  ] as BlogPost[],
};
