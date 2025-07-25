import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  FiGithub,
  FiSettings,
  FiMessageSquare,
  FiCalendar,
  FiCheckCircle,
  FiPlus,
  FiUsers,
  FiFileText,
  FiEdit2,
  FiTrash2,
  FiDollarSign,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCheck,
  FiUserPlus,
  FiTrendingUp,
  FiGitBranch, FiGitCommit, FiGitPullRequest, FiGitMerge, FiArrowLeft
} from 'react-icons/fi';

import { useNavigate } from 'react-router';

const ProjectManagementPage = ({
  project =
  {
    id: 'proj-001',
    name: 'Campus Connect App Development',
    description: 'Building a cross-platform app to enhance student collaboration across campus',
    teamMembers: [
      {
        id: 'user-001',
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'Team Lead'
      },
      {
        id: 'user-002',
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'Frontend Developer'
      },
      {
        id: 'user-003',
        name: 'Jamal Williams',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        role: 'Backend Developer'
      }
    ],
    githubRepo: 'https://github.com/student-dev-team/campus-connect',
    completion: 65,
    daysRemaining: 14,
    openTasks: 8,
    completedTasks: 12,
    overdueTasks: 2,
    tasks: [
      {
        id: 'task-001',
        title: 'Implement user authentication',
        status: 'done',
        dueDate: '2023-06-15',
        assignedTo: 'user-003',
        githubIssue: 'https://github.com/student-dev-team/campus-connect/issues/12'
      },
      {
        id: 'task-002',
        title: 'Design home screen UI',
        status: 'in_progress',
        dueDate: '2023-06-25',
        assignedTo: 'user-002'
      },
      {
        id: 'task-003',
        title: 'Setup database schema',
        status: 'todo',
        dueDate: '2023-06-30',
        assignedTo: 'user-003'
      }
    ],
    milestones: [
      {
        id: 'mile-001',
        name: 'Core Functionality Complete',
        description: 'All basic features implemented',
        status: 'completed',
        startDate: '2023-05-01',
        dueDate: '2023-05-31',
        progress: 100,
        completedTasks: 15,
        totalTasks: 15
      },
      {
        id: 'mile-002',
        name: 'Beta Testing Phase',
        description: 'Internal testing with student groups',
        status: 'active',
        startDate: '2023-06-01',
        dueDate: '2023-06-30',
        progress: 65,
        completedTasks: 13,
        totalTasks: 20
      }
    ],
    documents: [
      {
        id: 'doc-001',
        name: 'Project Charter.pdf',
        uploadedBy: 'user-001',
        date: '2023-04-28'
      }
    ]
  },
  onUpdateProject = (updatedProject) => {
    console.log('Project updated:', updatedProject);
  },
  isTeamLeader = true
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showTeamMemberModal, setShowTeamMemberModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const navigae = useNavigate();
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...project.tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);

    onUpdateProject({
      ...project,
      tasks: updatedTasks
    });
  };

  // Handle field editing
  const startEditing = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const saveEdit = () => {
    onUpdateProject({
      ...project,
      [editingField]: editValue
    });
    setEditingField(null);
  };

  // Handle team member actions
  const removeTeamMember = (memberId) => {
    onUpdateProject({
      ...project,
      teamMembers: project.teamMembers.filter(m => m.id !== memberId)
    });
  };

  const addTeamMember = (newMember) => {
    onUpdateProject({
      ...project,
      teamMembers: [...project.teamMembers, newMember]
    });
    setShowTeamMemberModal(false);
  };



  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Project Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-blue-900 border-b border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{project.name}</h1>
              <p className="text-gray-300 mt-2 max-w-2xl">{project.description}</p>

              <div className="flex items-center mt-4 gap-4">
                <div className="flex items-center text-sm text-gray-400">
                  <FiUsers className="mr-2" />
                  <span>{project.teamMembers.length} team members</span>
                </div>

                {project.githubRepo && (
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    <FiGithub className="mr-2" />
                    View GitHub Repository
                  </a>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowGithubModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <FiGithub /> {project.githubRepo ? 'Repo Settings' : 'Connect GitHub'}
              </button>
              <button className="flex items-center gap-2 border border-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors text-sm text-white">
                <FiSettings /> Project Settings
              </button>

              <button
                onClick={()=>navigae("/my-team")}
                className="flex items-center gap-2 border border-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors text-sm text-white"
              >
                <FiArrowLeft />
                Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-blue-900 border-b border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-gray-300 mb-2">Project Progress</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-sm text-gray-400">
                <span>{project.completion}% complete</span>
                <span>{project.daysRemaining} days remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-2xl font-bold text-white">{project.openTasks}</p>
                <p className="text-xs text-gray-400">Open Tasks</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-2xl font-bold text-white">{project.completedTasks}</p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-2xl font-bold text-white">{project.overdueTasks}</p>
                <p className="text-xs text-gray-400">Overdue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-700 bg-gradient-to-r from-slate-900 to-blue-900  pl-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tasks' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'}`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'milestones' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'}`}
            >
              Milestones
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'documents' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'}`}
            >
              <FiFileText className="inline mr-1" /> Documents
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'discussion' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'}`}
            >
              <FiMessageSquare className="inline mr-1" /> Discussion
            </button>
            <button
              onClick={() => setActiveTab('git')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'git' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'}`}
            >
              <FiGithub className="inline mr-1" /> GitHub Manager
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px] p-6 bg-gradient-to-r from-slate-900 to-blue-900">

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Task Management</h3>
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
                >
                  <FiPlus size={16} /> New Task
                </button>
              </div>

              <KanbanBoard
                tasks={project.tasks}
                teamMembers={project.teamMembers}
                onDragEnd={handleDragEnd}
              />
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Project Overview</h3>
                {isTeamLeader && (
                  <button
                    onClick={() => setShowGithubModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
                  >
                    <FiGithub /> {project.githubRepo ? 'Repo Settings' : 'Connect GitHub'}
                  </button>
                )}
              </div>

              {/* Project Basic Info Section */}
              <div className="relative isolate overflow-hidden">
                {/* Background gradient with animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900  to-blue-900 rounded-lg animate-shine">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                </div>

                {/* Glass morphism card */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none"></div>

                  <h4 className="text-md font-medium text-white mb-4 border-b border-white/10 pb-2 relative">
                    Basic Information
                    <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"></span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {/* Project Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300/90 mb-1">Project Name</label>
                      {editingField === 'name' ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-gray-800/70 text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-lg px-3 py-2 w-full transition-all"
                          />
                          <button
                            onClick={saveEdit}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-3 py-2 rounded-lg transition-all shadow-md hover:shadow-blue-500/20"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center group">
                          <p className="text-white/90">{project.name}</p>
                          {isTeamLeader && (
                            <button
                              onClick={() => startEditing('name', project.name)}
                              className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiEdit2 size={16} className="hover:scale-110 transition-transform" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Project Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300/90 mb-1">Description</label>
                      {editingField === 'description' ? (
                        <div className="flex flex-col gap-3">
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-gray-800/70 text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-lg px-3 py-2 w-full transition-all min-h-[100px]"
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingField(null)}
                              className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-all border border-gray-600/50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveEdit}
                              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-blue-500/20"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start group">
                          <p className="text-gray-300/90">{project.description}</p>
                          {isTeamLeader && (
                            <button
                              onClick={() => startEditing('description', project.description)}
                              className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                            >
                              <FiEdit2 size={16} className="hover:scale-110 transition-transform" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* GitHub Repo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300/90 mb-1">GitHub Repository</label>
                      <div className="flex justify-between items-center group">
                        {project.githubRepo ? (
                          <a
                            href={project.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                          >
                            <FiGithub className="flex-shrink-0" />
                            <span className="truncate">{project.githubRepo.replace('https://', '')}</span>
                          </a>
                        ) : (
                          <span className="text-gray-400/90">Not connected</span>
                        )}
                        {isTeamLeader && (
                          <button
                            onClick={() => setShowGithubModal(true)}
                            className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiEdit2 size={16} className="hover:scale-110 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300/90 mb-1">Budget</label>
                      {editingField === 'budget' ? (
                        <div className="flex items-center gap-2">
                          <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiDollarSign className="text-gray-400/80" />
                            </div>
                            <input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="bg-gray-800/70 text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-lg px-3 py-2 pl-10 w-full transition-all"
                            />
                          </div>
                          <button
                            onClick={saveEdit}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-3 py-2 rounded-lg transition-all shadow-md hover:shadow-blue-500/20"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center group">
                          <p className="text-white/90">${project.budget?.toLocaleString() || '0'}</p>
                          {isTeamLeader && (
                            <button
                              onClick={() => startEditing('budget', project.budget)}
                              className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiEdit2 size={16} className="hover:scale-110 transition-transform" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300/90 mb-1">Deadline</label>
                      {editingField === 'deadline' ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-gray-800/70 text-white border border-gray-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 rounded-lg px-3 py-2 w-full transition-all"
                          />
                          <button
                            onClick={saveEdit}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-3 py-2 rounded-lg transition-all shadow-md hover:shadow-blue-500/20"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center group">
                          <p className="text-white/90">
                            {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'Not set'}
                          </p>
                          {isTeamLeader && (
                            <button
                              onClick={() => startEditing('deadline', project.deadline)}
                              className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiEdit2 size={16} className="hover:scale-110 transition-transform" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Section */}
              <div className="relative isolate overflow-hidden mt-6">
                {/* Gradient background with shine animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg animate-shine">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                </div>

                {/* Glass card with interactive elements */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Section header with gradient underline */}
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10 relative">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FiUsers className="text-blue-300" />
                      Team Members
                    </h4>
                    {isTeamLeader && (
                      <button
                        onClick={() => setShowTeamMemberModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all shadow-md hover:shadow-blue-500/20"
                      >
                        <FiPlus size={16} /> Add Member
                      </button>
                    )}
                  </div>

                  {/* Team member cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.teamMembers.map(member => (
                      <div
                        key={member.id}
                        className="relative bg-gray-800/50 hover:bg-gray-700/70 rounded-xl p-4 flex items-center justify-between border border-white/5 transition-all duration-300 group overflow-hidden"
                      >
                        {/* Hover effect background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Member info */}
                        <div className="flex items-center z-10">
                          <div className="relative">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-12 h-12 rounded-full mr-3 border-2 border-white/20 group-hover:border-blue-400/50 transition-all"
                            />
                            {member.role === 'Team Lead' && (
                              <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1">
                                <FiCheckCircle className="text-white text-xs" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-blue-200 transition-colors">
                              {member.name}
                            </p>
                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                              {member.role}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons (appear on hover) */}
                        {isTeamLeader && member.role !== 'Team Lead' && (
                          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <button
                              onClick={() => removeTeamMember(member.id)}
                              className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-red-400/10 transition-all"
                              title="Remove member"
                            >
                              <FiTrash2 size={16} />
                            </button>
                            <button
                              onClick={() => {/* Add edit functionality here */ }}
                              className="p-2 text-gray-400 hover:text-blue-400 rounded-full hover:bg-blue-400/10 transition-all ml-1"
                              title="Edit member"
                            >
                              <FiEdit2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Empty state */}
                  {project.teamMembers.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <FiUsers size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No team members added yet</p>
                      {isTeamLeader && (
                        <button
                          onClick={() => setShowTeamMemberModal(true)}
                          className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-all"
                        >
                          Add Your First Team Member
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Overview Section */}
              <div className="relative isolate overflow-hidden mt-6">
                {/* Gradient background with shine animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg animate-shine">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                </div>

                {/* Glass card with interactive elements */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-lg p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                  {/* Section header with gradient underline */}
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10 relative">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <FiTrendingUp className="text-blue-300" />
                      Progress Overview
                    </h4>
                    <div className="flex items-center text-sm text-blue-300">
                      <FiCalendar className="mr-1" />
                      {project.daysRemaining} days remaining
                    </div>
                  </div>

                  {/* Main progress content */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Progress bar with animation */}
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">Project Completion</span>
                        <span className="text-sm font-bold text-white">{project.completion}%</span>
                      </div>
                      <div className="relative h-3 w-full bg-gray-700/70 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${project.completion}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse-slow"></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-400">
                        <span>Start</span>
                        <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Stats cards with hover effects */}
                    <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
                      <div className="bg-gray-800/50 hover:bg-gray-700/70 p-3 rounded-lg border border-white/5 transition-all duration-300 group">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {project.openTasks}
                          </p>
                          <p className="text-xs text-gray-300 group-hover:text-white transition-colors">
                            Open Tasks
                          </p>
                        </div>
                        <div className="h-1 mt-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ width: `${(project.openTasks / (project.openTasks + project.completedTasks)) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 hover:bg-gray-700/70 p-3 rounded-lg border border-white/5 transition-all duration-300 group">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">
                            {project.completedTasks}
                          </p>
                          <p className="text-xs text-gray-300 group-hover:text-white transition-colors">
                            Completed
                          </p>
                        </div>
                        <div className="h-1 mt-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(project.completedTasks / (project.openTasks + project.completedTasks)) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-800/50 hover:bg-gray-700/70 p-3 rounded-lg border border-white/5 transition-all duration-300 group">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-white mb-1 group-hover:text-red-300 transition-colors">
                            {project.overdueTasks}
                          </p>
                          <p className="text-xs text-gray-300 group-hover:text-white transition-colors">
                            Overdue
                          </p>
                        </div>
                        <div className="h-1 mt-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: `${(project.overdueTasks / (project.openTasks + project.completedTasks + project.overdueTasks)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional progress indicators */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800/30 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Current Sprint</p>
                      <p className="text-sm font-medium text-white">Beta Testing</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Velocity</p>
                      <p className="text-sm font-medium text-white">12 tasks/week</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Milestones</p>
                      <p className="text-sm font-medium text-white">2/5 completed</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-gray-400 mb-1">Health</p>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${project.health === 'good' ? 'bg-green-500' : project.health === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <p className="text-sm font-medium text-white capitalize">{project.health || 'good'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          )}

          {activeTab === 'milestones' && <MilestonesTab milestones={project.milestones} />}
          {activeTab === 'documents' && <DocumentsTab documents={project.documents} />}
          {activeTab === 'discussion' && <DiscussionTab projectId={project.id} />}
          {activeTab === 'git' && (
            <ManageVersionsTab
              branches={[
                { name: "main", protected: true },
                { name: "dev", protected: false },
                { name: "feature-x", protected: false }
              ]}
              commits={[
                {
                  sha: "a1b2c3d",
                  commit: {
                    message: "Initial commit",
                    author: {
                      name: "avinash",
                      date: "2025-07-24T10:00:00Z"
                    }
                  }
                },
                {
                  sha: "d4e5f6g",
                  commit: {
                    message: "Added login feature",
                    author: {
                      name: "jane-doe",
                      date: "2025-07-23T09:45:00Z"
                    }
                  }
                }
              ]}
              pullRequests={[
                {
                  id: 1,
                  number: 101,
                  title: "Fix typo in README",
                  user: { login: "dev-sam" },
                  state: "open",
                  created_at: "2025-07-20T12:34:56Z",
                  merged_at: null
                },
                {
                  id: 2,
                  number: 102,
                  title: "Implement dark mode",
                  user: { login: "designer-jane" },
                  state: "closed",
                  created_at: "2025-07-18T11:22:33Z",
                  merged_at: "2025-07-19T15:10:00Z"
                }
              ]}
              onMergePR={(number) => console.log("Merge PR", number)}
              onClosePR={(number) => console.log("Close PR", number)}
            />
          )}

        </div>
      </div>

      {/* Modals */}
      {showTaskModal && (
        <TaskFormModal
          teamMembers={project.teamMembers}
          onClose={() => setShowTaskModal(false)}
          onSubmit={(newTask) => {
            onUpdateProject({
              ...project,
              tasks: [...project.tasks, newTask]
            });
            setShowTaskModal(false);
          }}
        />
      )}

      {showGithubModal && (
        <GithubIntegrationModal
          currentRepo={project.githubRepo}
          onClose={() => setShowGithubModal(false)}
          onConnect={(repoUrl) => {
            onUpdateProject({
              ...project,
              githubRepo: repoUrl
            });
            setShowGithubModal(false);
          }}
        />
      )}
    </div>
  );
};

// Kanban Board Component
const KanbanBoard = ({ tasks, teamMembers, onDragEnd }) => {
  const statuses = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-700' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-blue-900' },
    { id: 'review', title: 'Review', color: 'bg-yellow-900' },
    { id: 'done', title: 'Done', color: 'bg-green-900' }
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statuses.map(status => (
          <Droppable key={status.id} droppableId={status.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-lg p-3 ${status.color} border border-gray-700`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-100">{status.title}</h4>
                  <span className="text-sm bg-gray-800/80 text-gray-200 px-2 py-0.5 rounded-full">
                    {tasks.filter(t => t.status === status.id).length}
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks
                    .filter(task => task.status === status.id)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-700 p-3 rounded-lg shadow-sm border-l-4 hover:bg-gray-600 transition-colors"
                            style={{
                              borderLeftColor:
                                status.id === 'todo' ? '#64748b' :
                                  status.id === 'in_progress' ? '#1e3a8a' :
                                    status.id === 'review' ? '#713f12' : '#14532d',
                              ...provided.draggableProps.style
                            }}
                          >
                            <div className="flex justify-between">
                              <h5 className="font-medium text-white">{task.title}</h5>
                              {task.githubIssue && (
                                <a
                                  href={task.githubIssue}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-gray-200"
                                >
                                  <FiGithub size={14} />
                                </a>
                              )}
                            </div>

                            {task.dueDate && (
                              <div className="flex items-center mt-1 text-xs text-gray-400">
                                <FiCalendar className="mr-1" size={12} />
                                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}

                            {task.assignedTo && (
                              <div className="mt-2 flex items-center">
                                <img
                                  src={teamMembers.find(m => m.id === task.assignedTo)?.avatar}
                                  alt="Assignee"
                                  className="w-6 h-6 rounded-full mr-2"
                                />
                                <span className="text-xs text-gray-300">
                                  {teamMembers.find(m => m.id === task.assignedTo)?.name}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

// Milestones Tab Component
const MilestonesTab = ({ milestones }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Project Milestones</h3>
        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm">
          <FiPlus size={16} /> New Milestone
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map(milestone => (
          <div key={milestone.id} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-lg text-white">{milestone.name}</h4>
                <p className="text-gray-400 text-sm mt-1">{milestone.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${milestone.status === 'completed' ? 'bg-green-900 text-green-200' :
                new Date(milestone.dueDate) < new Date() ? 'bg-red-900 text-red-200' : 'bg-blue-900 text-blue-200'
                }`}>
                {milestone.status === 'completed' ? 'Completed' :
                  new Date(milestone.dueDate) < new Date() ? 'Overdue' : 'Active'}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{milestone.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${milestone.progress}%`,
                    backgroundColor: milestone.progress === 100 ? '#14532d' : '#1e3a8a'
                  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Start Date</p>
                <p className="text-gray-300">{new Date(milestone.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Due Date</p>
                <p className="text-gray-300">{new Date(milestone.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Tasks</p>
                <p className="text-gray-300">{milestone.completedTasks}/{milestone.totalTasks}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Status</p>
                <p className="capitalize text-gray-300">{milestone.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// document tab
const DocumentsTab = ({ documents }) => {
  return (
    <div className="space-y-4 bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg animate-shine p-6 shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">📄 Project Documents</h3>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow transition-all duration-200 ease-in-out">
          <FiPlus size={16} /> Upload Document
        </button>
      </div>

      <div className="overflow-x-auto rounded-md shadow-inner">
        <table className="min-w-full divide-y divide-blue-800">
          <thead className="bg-blue-800/60">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-200 uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-200 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-200 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blue-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-900/80 divide-y divide-blue-900 text-sm text-blue-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-blue-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{doc.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doc.uploadedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(doc.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-400 hover:text-blue-300 mr-4 transition">Download</button>
                  <button className="text-red-400 hover:text-red-300 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Discussion Tab Component
const DiscussionTab = ({ projectId }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Project Discussion</h3>
        <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm">
          <FiPlus size={16} /> New Post
        </button>
      </div>

      <div className="bg-gray-700 rounded-lg p-4">
        <div className="text-center py-8 text-gray-400">
          <FiMessageSquare size={48} className="mx-auto mb-4" />
          <p>No discussions yet. Start a conversation!</p>
        </div>
      </div>
    </div>
  );
};

const GithubIntegrationModal = ({ currentRepo, onClose, onConnect }) => {
  const [repoUrl, setRepoUrl] = useState(currentRepo || '');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateRepoUrl = (url) => {
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(\/)?$/;
    return githubRegex.test(url);
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setRepoUrl(url);
    setIsValid(validateRepoUrl(url));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically verify the repo exists via API
      // For now we'll simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConnect(repoUrl);
    } catch (err) {
      setError('Failed to connect to repository. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              <FiGithub className="inline mr-2" />
              GitHub Integration
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-300 mt-2 text-sm">
            Connect your GitHub repository to sync issues and track development progress
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="repo-url" className="block text-sm font-medium text-gray-300 mb-2">
                GitHub Repository URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiGithub className="text-gray-500" />
                </div>
                <input
                  type="text"
                  id="repo-url"
                  className={`bg-gray-700 border ${error ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={handleUrlChange}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
              {!error && repoUrl && !isValid && (
                <p className="mt-2 text-sm text-yellow-400">Please enter a full GitHub repository URL</p>
              )}
              {isValid && (
                <p className="mt-2 text-sm text-green-400 flex items-center">
                  <FiCheckCircle className="mr-1" /> Valid GitHub repository
                </p>
              )}
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-2">What will be connected:</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>GitHub Issues will appear as tasks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pull Requests will be tracked</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Status changes will sync both ways</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-800 cursor-not-allowed'} transition-colors flex items-center justify-center min-w-[100px]`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </>
                ) : currentRepo ? 'Update Connection' : 'Connect Repository'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Team Member Modal Component
const TeamMemberModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/1.jpg');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: `user-${Math.floor(Math.random() * 10000)}`,
      name,
      avatar,
      role
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              <FiUsers className="inline mr-2" />
              Add Team Member
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="member-name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="member-name"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="member-email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="member-email"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="member-role" className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select
                id="member-role"
                className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="QA Tester">QA Tester</option>
                <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// mange git 
const ManageVersionsTab = ({ branches, commits, pullRequests, onMergePR, onClosePR }) => {
  const [activeView, setActiveView] = useState('branches');

  const tabs = [
    { key: 'branches', label: 'Branches', icon: <FiGitBranch /> },
    { key: 'commits', label: 'Commits', icon: <FiGitCommit /> },
    { key: 'pulls', label: 'Pull Requests', icon: <FiGitPullRequest /> },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-lg animate-shine p-6 shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <FiGitMerge /> Manage Versions
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-3 border-b border-blue-800 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-1 px-4 py-2 rounded ${activeView === tab.key
              ? 'bg-blue-600 text-white'
              : 'text-blue-300 hover:text-white hover:bg-blue-800'
              }`}
            onClick={() => setActiveView(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="text-blue-100">
        {activeView === 'branches' && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Branches</h4>
            <ul className="space-y-2">
              {branches.map((branch) => (
                <li key={branch.name} className="bg-slate-800 p-3 rounded-md">
                  <span className="font-mono text-blue-300">{branch.name}</span>
                  {branch.protected && (
                    <span className="ml-2 text-xs text-yellow-400">(protected)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeView === 'commits' && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Recent Commits</h4>
            <ul className="space-y-3">
              {commits.map((commit) => (
                <li key={commit.sha} className="bg-slate-800 p-4 rounded-md">
                  <div className="font-mono text-blue-300 truncate">
                    {commit.commit.message}
                  </div>
                  <div className="text-xs mt-1">
                    Author: {commit.commit.author.name} | Date:{' '}
                    {new Date(commit.commit.author.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeView === 'pulls' && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Pull Requests</h4>
            <ul className="space-y-3">
              {pullRequests.map((pr) => (
                <li key={pr.id} className="bg-slate-800 p-4 rounded-md">
                  <div className="font-semibold text-blue-300">
                    #{pr.number} - {pr.title}
                  </div>
                  <div className="text-xs text-blue-200 mb-2">
                    By {pr.user.login} | {pr.state.toUpperCase()} | Created:{' '}
                    {new Date(pr.created_at).toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    {pr.state === 'open' && (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() => onMergePR(pr.number)}
                        >
                          Merge
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() => onClosePR(pr.number)}
                        >
                          Close
                        </button>
                      </>
                    )}
                    {pr.state === 'closed' && !pr.merged_at && (
                      <span className="text-red-400 text-sm">Rejected</span>
                    )}
                    {pr.merged_at && (
                      <span className="text-green-400 text-sm">Merged</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};




export default ProjectManagementPage;









