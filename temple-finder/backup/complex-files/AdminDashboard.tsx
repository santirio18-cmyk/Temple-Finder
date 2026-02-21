import React, { useState } from 'react'
import { BarChart3, Users, Clock, Settings, Plus, Edit, Trash2 } from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'temples' | 'analytics'>('overview')

  const mockTemples = [
    {
      id: '1',
      name: 'Meenakshi Amman Temple',
      currentOccupancy: 250,
      capacity: 1000,
      lastUpdated: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Tirumala Venkateswara Temple',
      currentOccupancy: 1800,
      capacity: 2000,
      lastUpdated: '5 minutes ago'
    }
  ]

  const getCrowdLevel = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100
    if (percentage < 30) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage < 70) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
            Temple Management Dashboard
          </h1>
          <p className="text-neutral-600">
            Manage temple information, capacity, and visitor analytics
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 mb-6">
          <div className="border-b border-neutral-200">
            <nav className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'temples', label: 'Manage Temples', icon: Settings },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary-600">Total Temples</p>
                        <p className="text-2xl font-bold text-primary-900">12</p>
                      </div>
                      <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🕉️</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Active Visitors</p>
                        <p className="text-2xl font-bold text-blue-900">2,150</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Capacity Used</p>
                        <p className="text-2xl font-bold text-green-900">68%</p>
                      </div>
                      <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-600">Avg. Rating</p>
                        <p className="text-2xl font-bold text-yellow-900">4.7</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Temple Status */}
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <h3 className="text-lg font-heading font-bold text-neutral-900 mb-4">
                    Temple Status Overview
                  </h3>
                  <div className="space-y-4">
                    {mockTemples.map((temple) => {
                      const crowdLevel = getCrowdLevel(temple.currentOccupancy, temple.capacity)
                      return (
                        <div key={temple.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-neutral-900">{temple.name}</h4>
                            <p className="text-sm text-neutral-600">
                              {temple.currentOccupancy} / {temple.capacity} visitors
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${crowdLevel.bg} ${crowdLevel.color}`}>
                                {crowdLevel.level}
                              </div>
                              <p className="text-xs text-neutral-500 mt-1">
                                Updated {temple.lastUpdated}
                              </p>
                            </div>
                            <button className="p-2 text-neutral-400 hover:text-primary-500 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'temples' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-heading font-bold text-neutral-900">
                    Manage Temples
                  </h3>
                  <button className="btn-primary flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Temple</span>
                  </button>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Temple Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Capacity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {mockTemples.map((temple) => {
                          const crowdLevel = getCrowdLevel(temple.currentOccupancy, temple.capacity)
                          return (
                            <tr key={temple.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-neutral-900">
                                    {temple.name}
                                  </div>
                                  <div className="text-sm text-neutral-500">
                                    {temple.currentOccupancy} visitors
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                Madurai, Tamil Nadu
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {temple.capacity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${crowdLevel.bg} ${crowdLevel.color}`}>
                                  {crowdLevel.level}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                  <button className="text-primary-600 hover:text-primary-900">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-heading font-bold text-neutral-900">
                  Analytics & Reports
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-neutral-200 rounded-xl p-6">
                    <h4 className="font-medium text-neutral-900 mb-4">Visitor Trends</h4>
                    <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                        <p className="text-neutral-600">Chart coming soon</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-neutral-200 rounded-xl p-6">
                    <h4 className="font-medium text-neutral-900 mb-4">Peak Hours</h4>
                    <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Clock className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                        <p className="text-neutral-600">Chart coming soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
