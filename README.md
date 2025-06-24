<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Powered Job Application Agent - Interactive Dashboard</title>
    
    <!-- Placeholder Comments -->
    <!-- Chosen Palette: Cool Blues & Neutrals (Slate, Sky, Indigo) -->
    <!-- Application Structure Plan: A tab-based, single-page dashboard. The 'Dashboard' tab provides a high-level visual summary with charts and KPIs. The 'Modules' tab offers a deep dive into each of the six core system features. The 'Workflow' tab presents the user journey as an interactive process flow diagram. This structure was chosen to make a complex, text-heavy plan easily digestible by separating the high-level summary from the detailed components and process, allowing users to explore based on their interests. -->
    <!-- Visualization & Content Choices: 
        - Report Info: Application Status (Applied, Interview, Rejected) -> Goal: Inform -> Viz: Doughnut Chart (Chart.js) -> Interaction: Hover tooltips -> Justification: Excellent for showing parts of a whole, immediately conveying the application funnel status.
        - Report Info: Job Matches by Platform -> Goal: Compare -> Viz: Bar Chart (Chart.js) -> Interaction: Hover tooltips -> Justification: Clearly compares the volume of opportunities across different sources.
        - Report Info: Core System Modules -> Goal: Organize -> Viz: Interactive Cards (HTML/CSS) -> Interaction: Click to toggle details -> Justification: Groups related features logically and allows for progressive disclosure of information without overwhelming the user.
        - Report Info: Example User Workflow -> Goal: Change/Process -> Viz: Step-by-step Diagram (HTML/Tailwind CSS) -> Interaction: Hover highlight on steps -> Justification: Visually represents the sequence of events, making the automated process easy to follow.
    -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 400px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 350px;
            }
        }
        .nav-link {
            transition: all 0.3s ease;
        }
        .nav-link.active {
            color: #4f46e5;
            border-bottom-color: #4f46e5;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-700">

    <div class="container mx-auto p-4 sm:p-6 lg:p-8">

        <!-- Header -->
        <header class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-slate-900">AI-Powered Job Application Agent</h1>
            <p class="mt-2 text-slate-500 max-w-2xl mx-auto">An interactive overview of the intelligent agent designed to automate your job search and application process.</p>
        </header>

        <!-- Navigation -->
        <nav class="flex justify-center border-b border-slate-200 mb-8">
            <button data-tab="dashboard" class="nav-link active text-lg font-semibold py-4 px-6 border-b-2 border-transparent hover:text-indigo-600">Dashboard</button>
            <button data-tab="modules" class="nav-link text-lg font-semibold py-4 px-6 border-b-2 border-transparent hover:text-indigo-600">Core Modules</button>
            <button data-tab="workflow" class="nav-link text-lg font-semibold py-4 px-6 border-b-2 border-transparent hover:text-indigo-600">Workflow</button>
        </nav>

        <!-- Main Content -->
        <main>
            <!-- Dashboard Tab -->
            <div id="dashboard" class="tab-content active">
                <div class="text-center mb-8">
                     <h2 class="text-2xl font-semibold text-slate-800">The Command Center</h2>
                     <p class="text-slate-500 mt-1">A high-level overview of your automated job search activity.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                        <h3 class="text-lg font-semibold text-slate-500">Total Applications</h3>
                        <p id="total-apps" class="text-4xl font-bold text-indigo-600 mt-2">124</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                        <h3 class="text-lg font-semibold text-slate-500">Average Match Score</h3>
                        <p id="avg-match" class="text-4xl font-bold text-indigo-600 mt-2">88%</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                        <h3 class="text-lg font-semibold text-slate-500">Active Searches</h3>
                        <p id="active-searches" class="text-4xl font-bold text-indigo-600 mt-2">4</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div class="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 class="text-xl font-semibold text-slate-800 mb-4 text-center">Job Matches by Platform</h3>
                        <div class="chart-container !max-w-full !h-[350px] sm:!h-[400px]">
                            <canvas id="matchesByPlatformChart"></canvas>
                        </div>
                    </div>
                    <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                         <h3 class="text-xl font-semibold text-slate-800 mb-4 text-center">Application Status</h3>
                        <div class="chart-container !max-w-sm !h-[350px] sm:!h-[400px]">
                            <canvas id="applicationStatusChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modules Tab -->
            <div id="modules" class="tab-content">
                 <div class="text-center mb-8">
                     <h2 class="text-2xl font-semibold text-slate-800">Core System Modules</h2>
                     <p class="text-slate-500 mt-1">Explore the six interconnected modules that power the agent.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Module Cards will be inserted here by JS -->
                </div>
            </div>

            <!-- Workflow Tab -->
            <div id="workflow" class="tab-content">
                <div class="text-center mb-8">
                     <h2 class="text-2xl font-semibold text-slate-800">Automated User Workflow</h2>
                     <p class="text-slate-500 mt-1">See how the agent takes a user from setup to submission seamlessly.</p>
                </div>
                <div id="workflow-steps-container" class="space-y-4">
                     <!-- Workflow steps will be inserted here by JS -->
                </div>
            </div>

        </main>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Data from Source Report ---
            const modulesData = [
                { title: 'User Profile Module', subtitle: 'The Foundation', description: "Allows users to build a detailed professional profile, including personal info, work experience, education, skills, and manage CVs and cover letter templates.", icon: '👤' },
                { title: 'Job Search & Aggregation', subtitle: 'The Hunter', description: "Aggregates job listings from global boards like LinkedIn and Indeed, and key European portals like StepStone, with advanced filtering capabilities.", icon: '🔍' },
                { title: 'Job Description Analysis', subtitle: 'The Brain', description: "Uses NLP to parse job requirements, score user profiles against them, and provide a detailed analysis of strengths, weaknesses, and missing qualifications.", icon: '🧠' },
                { title: 'Content Generation', subtitle: 'The Writer', description: "Automatically generates dynamically tailored CVs and unique cover letters that address the specific needs identified in the job description.", icon: '✍️' },
                { title: 'Application & Submission', subtitle: 'The Agent', description: "The core automation feature. Performs 'genuine filling' of application forms via a browser extension, handling fields, screening questions, and submissions on platforms like LinkedIn.", icon: '🤖' },
                { title: 'Dashboard & Tracking', subtitle: 'The Command Center', description: "Provides a central control panel to oversee the process, review applications before submission, and track the status of all applications (Applied, Interview, etc.).", icon: '📊' }
            ];

            const workflowData = [
                { step: 1, title: 'Setup & Configuration', description: 'The user creates their detailed professional profile and enables "Auto-Apply" for jobs that exceed a pre-defined match score (e.g., >90%).', icon: '⚙️' },
                { step: 2, title: 'Discovery & Matching', description: 'The AI agent constantly scans job boards. It discovers a "Senior Developer" role on a European site with a 95% match score for the user.', icon: '🎯' },
                { step: 3, title: 'Automated Generation', description: 'The system instantly generates a CV tailored specifically for the Senior Developer role and drafts a unique cover letter to match.', icon: '📄' },
                { step: 4, title: 'Autonomous Submission', description: 'Because the 95% score exceeds the user\'s 90% threshold, the Submission Agent activates. It navigates the job portal, fills the form, uploads documents, and submits.', icon: '🚀' },
                { step: 5, title: 'Notification & Tracking', description: 'The user receives a notification that an application was successfully submitted on their behalf. The dashboard is automatically updated to reflect this new application.', icon: '🔔' }
            ];


            // --- Tab Navigation Logic ---
            const navLinks = document.querySelectorAll('.nav-link');
            const tabContents = document.querySelectorAll('.tab-content');

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    const tabId = link.getAttribute('data-tab');
                    tabContents.forEach(content => {
                        content.id === tabId ? content.classList.add('active') : content.classList.remove('active');
                    });
                });
            });


            // --- Chart.js Initialization ---
            const initCharts = () => {
                // Bar Chart: Matches by Platform
                const matchesCtx = document.getElementById('matchesByPlatformChart').getContext('2d');
                new Chart(matchesCtx, {
                    type: 'bar',
                    data: {
                        labels: ['LinkedIn', 'Indeed', 'StepStone', 'Glassdoor', 'Xing', 'Totaljobs'],
                        datasets: [{
                            label: 'Job Matches Found',
                            data: [65, 59, 80, 81, 56, 55],
                            backgroundColor: 'rgba(79, 70, 229, 0.8)',
                            borderColor: 'rgba(79, 70, 229, 1)',
                            borderWidth: 1,
                            borderRadius: 8
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: { beginAtZero: true }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return `${context.dataset.label}: ${context.raw}`;
                                    }
                                }
                            }
                        }
                    }
                });

                // Doughnut Chart: Application Status
                const statusCtx = document.getElementById('applicationStatusChart').getContext('2d');
                new Chart(statusCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Applied', 'Under Review', 'Interview Stage', 'Rejected', 'Offer'],
                        datasets: [{
                            label: 'Application Status',
                            data: [80, 25, 12, 5, 2],
                            backgroundColor: [
                                'rgb(59, 130, 246)',
                                'rgb(245, 158, 11)',
                                'rgb(34, 197, 94)',
                                'rgb(239, 68, 68)',
                                'rgb(168, 85, 247)'
                            ],
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                        }
                    }
                });
            };


            // --- Dynamic Content Population ---
            const populateModules = () => {
                const container = document.querySelector('#modules .grid');
                container.innerHTML = modulesData.map(module => `
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                        <div class="flex-grow">
                            <h3 class="text-xl font-bold text-slate-800 flex items-center mb-2">
                                <span class="text-2xl mr-3">${module.icon}</span>
                                ${module.title}
                            </h3>
                            <p class="text-sm font-semibold text-indigo-600 mb-3">${module.subtitle}</p>
                            <p class="text-slate-600">${module.description}</p>
                        </div>
                    </div>
                `).join('');
            };
            
            const populateWorkflow = () => {
                const container = document.getElementById('workflow-steps-container');
                container.innerHTML = workflowData.map(step => `
                    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start space-x-4 hover:shadow-md hover:border-indigo-300 transition-all duration-300">
                        <div class="text-4xl">${step.icon}</div>
                        <div>
                            <p class="text-sm font-bold text-indigo-600">STEP ${step.step}</p>
                            <h3 class="text-xl font-semibold text-slate-800">${step.title}</h3>
                            <p class="text-slate-600 mt-1">${step.description}</p>
                        </div>
                    </div>
                `).join('');
            };

            // --- Initial Load ---
            initCharts();
            populateModules();
            populateWorkflow();
        });
    </script>
</body>
</html>
