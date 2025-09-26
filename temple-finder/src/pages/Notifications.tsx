import React, { useState } from 'react'
import { Bell, Clock, Users, Star, X } from 'lucide-react'

const Notifications: React.FC = () => {
  const [notifications] = useState([
    {
      id: '1',
      title: 'Temple Timing Update',
      message: 'Meenakshi Amman Temple has updated its evening aarti timing to 7:00 PM',
      type: 'timing_update',
      temple: 'Meenakshi Amman Temple',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      title: 'Crowd Alert',
      message: 'Tirumala Venkateswara Temple is experiencing high crowd levels (85% capacity)',
      type: 'crowd_alert',
      temple: 'Tirumala Venkateswara Temple',
      time: '4 hours ago',
      isRead: false
    },
    {
      id: '3',
      title: 'Festival Notification',
      message: 'Maha Shivaratri celebrations begin tomorrow at Shiva temples near you',
      type: 'festival',
      temple: 'Shiva Temples',
      time: '1 day ago',
      isRead: true
    },
    {
      id: '4',
      title: 'New Review',
      message: 'Someone reviewed your favorite temple - Meenakshi Amman Temple',
      type: 'general',
      temple: 'Meenakshi Amman Temple',
      time: '2 days ago',
      isRead: true
    }
  ])

  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  )

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'timing_update':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'crowd_alert':
        return <Users className="w-5 h-5 text-red-500" />
      case 'festival':
        return <Star className="w-5 h-5 text-yellow-500" />
      default:
        return <Bell className="w-5 h-5 text-neutral-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'timing_update':
        return 'bg-blue-50 border-blue-200'
      case 'crowd_alert':
        return 'bg-red-50 border-red-200'
      case 'festival':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-neutral-50 border-neutral-200'
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
            Notifications
          </h1>
          <p className="text-neutral-600 mb-6">
            Stay updated with temple timings, crowd alerts, and festival notifications
          </p>

          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-neutral-200 w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-primary-500 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Unread ({notifications.filter(n => !n.isRead).length})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-heading font-bold text-neutral-900 mb-2">
                No notifications
              </h3>
              <p className="text-neutral-600">
                {filter === 'unread' 
                  ? 'You have no unread notifications'
                  : 'You have no notifications yet'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
                  !notification.isRead ? 'border-l-4 border-l-primary-500' : ''
                } ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-neutral-700 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-500">
                          <span>{notification.temple}</span>
                          <span>•</span>
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        )}
                        <button className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mark All as Read */}
        {notifications.some(n => !n.isRead) && (
          <div className="mt-8 text-center">
            <button className="btn-outline">
              Mark All as Read
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
