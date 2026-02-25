// secrets.js - COMPLETE FIREBASE FIX
(function() {
    console.log('🔍 secrets.js LOADING...');

    window.API_CONFIG = {
        firebase: {
            apiKey: "demo-disabled",
            authDomain: "demo.firebaseapp.com",
            databaseURL: "https://demo.firebaseio.com",
            projectId: "demo-project",
            storageBucket: "demo.appspot.com",
            messagingSenderId: "000000",
            appId: "demo-app-id",
            measurementId: "demo-measurement"
        },
        alphaVantage: {
            key: "demo",
            enabled: false
        }
    };

    function checkAdminKeys() {
        console.log('🔍 Checking URL params...');
        const params = new URLSearchParams(window.location.search);
        
        // ALL Firebase params needed
        const firebaseKey = params.get('firebase-key');
        const firebaseAuth = params.get('firebase-auth');
        const firebaseDb = params.get('firebase-db');
        const firebaseProject = params.get('firebase-project');
        const firebaseStorage = params.get('firebase-storage');
        const firebaseSender = params.get('firebase-sender');
        const firebaseAppId = params.get('firebase-appid');
        const firebaseMeasurement = params.get('firebase-measurement');
        const avKey = params.get('av-key');
        
        let keysLoaded = false;
        
        if (firebaseKey || avKey) {
            console.log('✅ ADMIN KEYS DETECTED!');
            
            // FULL FIREBASE CONFIG OVERRIDE
            if (firebaseKey) {
                window.API_CONFIG.firebase = {
                    apiKey: firebaseKey,
                    authDomain: firebaseAuth || 'realtime-executive-ai.firebaseapp.com',
                    databaseURL: firebaseDb || 'https://realtime-executive-ai-default-rtdb.firebaseio.com',
                    projectId: firebaseProject || 'realtime-executive-ai',
                    storageBucket: firebaseStorage || 'realtime-executive-ai.firebasestorage.app',
                    messagingSenderId: firebaseSender || '6323726045',
                    appId: firebaseAppId || '1:632372636045:web:f6d24ade5314da134435c4',
                    measurementId: firebaseMeasurement || 'G-LV8P7HQDF8'
                };
            }
            
            if (avKey) {
                window.API_CONFIG.alphaVantage.key = avKey;
                window.API_CONFIG.alphaVantage.enabled = true;
            }
            
            keysLoaded = true;
            console.log('🔑 FULL CONFIG LOADED!');
        }
        
        console.log('📊 Final status:', {
            firebaseReady: window.API_CONFIG.firebase.apiKey !== 'demo-disabled',
            databaseURL: window.API_CONFIG.firebase.databaseURL,
            alphaVantageReady: window.API_CONFIG.alphaVantage.enabled,
            keysLoaded
        });
    }

    // Run after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAdminKeys);
    } else {
        checkAdminKeys();
    }
})();
