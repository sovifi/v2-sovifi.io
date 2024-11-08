export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          created_at: string
          updated_at: string
          wallet_address: string | null
          is_artist: boolean
          profile_image: string | null
          bio: string | null
          verified: boolean
        }
        Insert: {
          id?: string
          email: string
          username: string
          created_at?: string
          updated_at?: string
          wallet_address?: string | null
          is_artist?: boolean
          profile_image?: string | null
          bio?: string | null
          verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          username?: string
          created_at?: string
          updated_at?: string
          wallet_address?: string | null
          is_artist?: boolean
          profile_image?: string | null
          bio?: string | null
          verified?: boolean
        }
      }
      nfts: {
        Row: {
          id: string
          contract_address: string
          token_id: string
          creator_id: string
          owner_id: string
          metadata: Json
          created_at: string
          updated_at: string
          price: string
          currency: string
          status: 'listed' | 'unlisted' | 'sold'
        }
        Insert: {
          id?: string
          contract_address: string
          token_id: string
          creator_id: string
          owner_id: string
          metadata?: Json
          created_at?: string
          updated_at?: string
          price?: string
          currency?: string
          status?: 'listed' | 'unlisted' | 'sold'
        }
        Update: {
          id?: string
          contract_address?: string
          token_id?: string
          creator_id?: string
          owner_id?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
          price?: string
          currency?: string
          status?: 'listed' | 'unlisted' | 'sold'
        }
      }
      transactions: {
        Row: {
          id: string
          nft_id: string
          seller_id: string
          buyer_id: string
          price: string
          currency: string
          transaction_hash: string
          created_at: string
          platform_fee: string
          royalty_fee: string
        }
        Insert: {
          id?: string
          nft_id: string
          seller_id: string
          buyer_id: string
          price: string
          currency: string
          transaction_hash: string
          created_at?: string
          platform_fee: string
          royalty_fee: string
        }
        Update: {
          id?: string
          nft_id?: string
          seller_id?: string
          buyer_id?: string
          price?: string
          currency?: string
          transaction_hash?: string
          created_at?: string
          platform_fee?: string
          royalty_fee?: string
        }
      }
      artist_profiles: {
        Row: {
          id: string
          user_id: string
          genres: string[]
          total_sales: string
          fan_count: number
          created_at: string
          updated_at: string
          social_links: Json
          streaming_links: Json
        }
        Insert: {
          id?: string
          user_id: string
          genres?: string[]
          total_sales?: string
          fan_count?: number
          created_at?: string
          updated_at?: string
          social_links?: Json
          streaming_links?: Json
        }
        Update: {
          id?: string
          user_id?: string
          genres?: string[]
          total_sales?: string
          fan_count?: number
          created_at?: string
          updated_at?: string
          social_links?: Json
          streaming_links?: Json
        }
      }
      creator_clubs: {
        Row: {
          id: string
          artist_id: string
          name: string
          description: string
          membership_nft_address: string
          created_at: string
          updated_at: string
          perks: Json
          tiers: Json
        }
        Insert: {
          id?: string
          artist_id: string
          name: string
          description: string
          membership_nft_address: string
          created_at?: string
          updated_at?: string
          perks?: Json
          tiers?: Json
        }
        Update: {
          id?: string
          artist_id?: string
          name?: string
          description?: string
          membership_nft_address?: string
          created_at?: string
          updated_at?: string
          perks?: Json
          tiers?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}