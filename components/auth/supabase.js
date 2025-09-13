// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// Supabase project URL and API key
const supabaseUrl = 'https://oakfywfoxmolzavqgces.supabase.co' // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ha2Z5d2ZveG1vbHphdnFnY2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NDkyMjksImV4cCI6MjA3MzMyNTIyOX0.paZ-BOisJxXDj35HUsH5cufymHx2GjLUFNwGxL20wyA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase