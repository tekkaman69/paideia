export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'parent' | 'eleve' | 'teacher' | 'staff'
          phone: string | null
          calm_mode: boolean
          dys_font_enabled: boolean
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'parent' | 'eleve' | 'teacher' | 'staff'
          phone?: string | null
          calm_mode?: boolean
          dys_font_enabled?: boolean
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'parent' | 'eleve' | 'teacher' | 'staff'
          phone?: string | null
          calm_mode?: boolean
          dys_font_enabled?: boolean
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          id: string
          profile_id: string
          parent_id: string | null
          display_name: string
          age_range: '6-8' | '9-11' | '12-15' | '16+' | null
          grade_level: string | null
          neuro_profile: string[]
          accommodations: string | null
          goals_text: string | null
          xp_total: number
          level: number
          streak_days: number
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          parent_id?: string | null
          display_name: string
          age_range?: '6-8' | '9-11' | '12-15' | '16+' | null
          grade_level?: string | null
          neuro_profile?: string[]
          accommodations?: string | null
          goals_text?: string | null
          xp_total?: number
          level?: number
          streak_days?: number
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          profile_id?: string
          parent_id?: string | null
          display_name?: string
          age_range?: '6-8' | '9-11' | '12-15' | '16+' | null
          grade_level?: string | null
          neuro_profile?: string[]
          accommodations?: string | null
          goals_text?: string | null
          xp_total?: number
          level?: number
          streak_days?: number
          avatar_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      parent_student_links: {
        Row: {
          id: string
          parent_id: string
          student_id: string
          relationship: string
          created_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          student_id: string
          relationship?: string
          created_at?: string
        }
        Update: {
          relationship?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price_monthly: number
          price_yearly: number | null
          currency: string
          features: string[]
          stripe_price_id_monthly: string | null
          stripe_price_id_yearly: string | null
          has_virtual_class: boolean
          max_students: number | null
          sessions_per_month: number | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price_monthly: number
          price_yearly?: number | null
          currency?: string
          features?: string[]
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
          has_virtual_class?: boolean
          max_students?: number | null
          sessions_per_month?: number | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          price_monthly?: number
          price_yearly?: number | null
          currency?: string
          features?: string[]
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
          has_virtual_class?: boolean
          max_students?: number | null
          sessions_per_month?: number | null
          is_active?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          id: string
          profile_id: string
          plan_id: string
          stripe_subscription_id: string | null
          stripe_customer_id: string | null
          status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete'
          billing_cycle: 'monthly' | 'yearly'
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          plan_id: string
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete'
          billing_cycle?: 'monthly' | 'yearly'
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          plan_id?: string
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete'
          billing_cycle?: 'monthly' | 'yearly'
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          profile_id: string
          subscription_id: string | null
          stripe_payment_intent_id: string | null
          stripe_invoice_id: string | null
          amount: number
          currency: string
          status: 'succeeded' | 'pending' | 'failed' | 'refunded'
          description: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          subscription_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_invoice_id?: string | null
          amount: number
          currency?: string
          status?: 'succeeded' | 'pending' | 'failed' | 'refunded'
          description?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          status?: 'succeeded' | 'pending' | 'failed' | 'refunded'
          description?: string | null
          metadata?: Json | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string | null
          xp_reward: number
          icon: string | null
          color: string | null
          is_active: boolean
          sort_order: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category?: string | null
          xp_reward?: number
          icon?: string | null
          color?: string | null
          is_active?: boolean
          sort_order?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          category?: string | null
          xp_reward?: number
          icon?: string | null
          color?: string | null
          is_active?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      student_goals: {
        Row: {
          id: string
          student_id: string
          goal_id: string
          status: 'not_started' | 'in_progress' | 'completed'
          progress_percent: number
          started_at: string | null
          completed_at: string | null
          notes: string | null
          assigned_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          goal_id: string
          status?: 'not_started' | 'in_progress' | 'completed'
          progress_percent?: number
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          assigned_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'not_started' | 'in_progress' | 'completed'
          progress_percent?: number
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          id: string
          key: string
          title: string
          description: string | null
          icon: string | null
          image_url: string | null
          xp_required: number | null
          criteria: Json | null
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          key: string
          title: string
          description?: string | null
          icon?: string | null
          image_url?: string | null
          xp_required?: number | null
          criteria?: Json | null
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          is_active?: boolean
          created_at?: string
        }
        Update: {
          key?: string
          title?: string
          description?: string | null
          icon?: string | null
          image_url?: string | null
          xp_required?: number | null
          criteria?: Json | null
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          is_active?: boolean
        }
        Relationships: []
      }
      student_badges: {
        Row: {
          id: string
          student_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          student_id: string
          badge_id: string
          earned_at?: string
        }
        Update: Record<string, never>
        Relationships: []
      }
      xp_events: {
        Row: {
          id: string
          student_id: string
          event_type: string
          points: number
          description: string | null
          reference_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          event_type: string
          points: number
          description?: string | null
          reference_id?: string | null
          created_at?: string
        }
        Update: Record<string, never>
        Relationships: []
      }
      content_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          icon: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          icon?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      content_items: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content_html: string | null
          cover_image_url: string | null
          category_id: string | null
          content_type: 'article' | 'exercise' | 'video' | 'document' | 'quiz' | 'worksheet'
          status: 'draft' | 'published' | 'archived'
          access_level: 'public' | 'all_subscribers' | 'plan_specific' | 'student_specific'
          required_plan_id: string | null
          tags: string[]
          sort_order: number
          view_count: number
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content_html?: string | null
          cover_image_url?: string | null
          category_id?: string | null
          content_type?: 'article' | 'exercise' | 'video' | 'document' | 'quiz' | 'worksheet'
          status?: 'draft' | 'published' | 'archived'
          access_level?: 'public' | 'all_subscribers' | 'plan_specific' | 'student_specific'
          required_plan_id?: string | null
          tags?: string[]
          sort_order?: number
          view_count?: number
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          slug?: string
          excerpt?: string | null
          content_html?: string | null
          cover_image_url?: string | null
          category_id?: string | null
          content_type?: 'article' | 'exercise' | 'video' | 'document' | 'quiz' | 'worksheet'
          status?: 'draft' | 'published' | 'archived'
          access_level?: 'public' | 'all_subscribers' | 'plan_specific' | 'student_specific'
          required_plan_id?: string | null
          tags?: string[]
          sort_order?: number
          published_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content_assignments: {
        Row: {
          id: string
          content_id: string
          assigned_to_student_id: string | null
          assigned_to_plan_id: string | null
          assigned_by: string | null
          due_date: string | null
          is_completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          assigned_to_student_id?: string | null
          assigned_to_plan_id?: string | null
          assigned_by?: string | null
          due_date?: string | null
          is_completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          due_date?: string | null
          is_completed?: boolean
          completed_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_type: 'cours' | 'rdv_parent' | 'atelier' | 'classe_virtuelle' | 'autre'
          start_at: string
          end_at: string
          status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
          virtual_room_id: string | null
          location: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_type?: 'cours' | 'rdv_parent' | 'atelier' | 'classe_virtuelle' | 'autre'
          start_at: string
          end_at: string
          status?: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
          virtual_room_id?: string | null
          location?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          event_type?: 'cours' | 'rdv_parent' | 'atelier' | 'classe_virtuelle' | 'autre'
          start_at?: string
          end_at?: string
          status?: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
          virtual_room_id?: string | null
          location?: string | null
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      event_participants: {
        Row: {
          id: string
          event_id: string
          profile_id: string
          participant_type: 'student' | 'parent' | 'teacher' | 'observer'
          status: 'invited' | 'confirmed' | 'declined' | 'attended'
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          profile_id: string
          participant_type?: 'student' | 'parent' | 'teacher' | 'observer'
          status?: 'invited' | 'confirmed' | 'declined' | 'attended'
          created_at?: string
        }
        Update: {
          status?: 'invited' | 'confirmed' | 'declined' | 'attended'
        }
        Relationships: []
      }
      virtual_rooms: {
        Row: {
          id: string
          name: string
          provider: 'daily' | 'meet' | 'zoom' | 'custom'
          room_url: string | null
          provider_room_id: string | null
          provider_token: string | null
          is_active: boolean
          max_participants: number | null
          scheduled_start: string | null
          scheduled_end: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          provider?: 'daily' | 'meet' | 'zoom' | 'custom'
          room_url?: string | null
          provider_room_id?: string | null
          provider_token?: string | null
          is_active?: boolean
          max_participants?: number | null
          scheduled_start?: string | null
          scheduled_end?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          provider?: 'daily' | 'meet' | 'zoom' | 'custom'
          room_url?: string | null
          provider_room_id?: string | null
          provider_token?: string | null
          is_active?: boolean
          max_participants?: number | null
          scheduled_start?: string | null
          scheduled_end?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content_html: string | null
          cover_image_url: string | null
          author_id: string | null
          status: 'draft' | 'published'
          tags: string[]
          category: string | null
          meta_title: string | null
          meta_description: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content_html?: string | null
          cover_image_url?: string | null
          author_id?: string | null
          status?: 'draft' | 'published'
          tags?: string[]
          category?: string | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          slug?: string
          title?: string
          excerpt?: string | null
          content_html?: string | null
          cover_image_url?: string | null
          status?: 'draft' | 'published'
          tags?: string[]
          category?: string | null
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          profile_id: string
          title: string
          message: string | null
          type: 'info' | 'success' | 'warning' | 'error'
          is_read: boolean
          action_url: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          title: string
          message?: string | null
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          action_url?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          is_read?: boolean
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          resource_type: string | null
          resource_id: string | null
          metadata: Json | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action: string
          resource_type?: string | null
          resource_id?: string | null
          metadata?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Update: Record<string, never>
        Relationships: []
      }
      platform_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          updated_by: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          updated_by?: string | null
          updated_at?: string
        }
        Update: {
          value?: Json
          description?: string | null
          updated_by?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      award_xp: {
        Args: { p_student_id: string; p_event_type: string; p_points: number; p_description?: string }
        Returns: void
      }
    }
    Enums: {
      user_role: 'admin' | 'parent' | 'eleve' | 'teacher' | 'staff'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
