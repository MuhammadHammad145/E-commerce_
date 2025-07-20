import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://oonhohlbdybxcftwzhbb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vbmhvaGxiZHlieGNmdHd6aGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODQ2MzcsImV4cCI6MjA2MDA2MDYzN30.8A0MXcXY_tIOYqQD-q62rmNG7x2nW4k7zKBiGjB_CIU'
const supabase = createClient(supabaseUrl, supabaseKey)

export {supabase}