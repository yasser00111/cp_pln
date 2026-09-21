<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OperationalController;
use App\Http\Controllers\SustainabilityController;
use App\Http\Controllers\BiodiversityController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\ContentController;
use Illuminate\Support\Facades\Route;

// 1. Home Module
Route::get('/', [HomeController::class, 'index'])->name('home');

// 2. Profile Module
Route::prefix('profile')->name('profile.')->group(function () {
    Route::get('/tentang', [ProfileController::class, 'tentang'])->name('tentang');
    Route::get('/visi-misi', [ProfileController::class, 'visiMisi'])->name('visi-misi');
    Route::get('/sejarah', [ProfileController::class, 'sejarah'])->name('sejarah');
    Route::get('/struktur-organisasi', [ProfileController::class, 'struktur'])->name('struktur');
    Route::get('/pimpinan', [ProfileController::class, 'pimpinan'])->name('pimpinan');
    Route::get('/fasilitas', [ProfileController::class, 'fasilitas'])->name('fasilitas');
    Route::get('/penghargaan', [ProfileController::class, 'penghargaan'])->name('penghargaan');
    Route::get('/human-capital', [ProfileController::class, 'humanCapital'])->name('human-capital');
});

// Shortcuts requested in specs
Route::get('/csr', [SustainabilityController::class, 'csr'])->name('csr');
Route::get('/awards', [ProfileController::class, 'penghargaan'])->name('awards');

// 3. Operational Module
Route::prefix('operasional')->name('operasional.')->group(function () {
    Route::get('/profil', [OperationalController::class, 'index'])->name('profil');
    Route::get('/kapasitas', [OperationalController::class, 'kapasitas'])->name('kapasitas');
    Route::get('/performance', [OperationalController::class, 'performance'])->name('performance');
    Route::get('/unit-fasilitas', [OperationalController::class, 'unitFasilitas'])->name('unit-fasilitas');
});

// 4. Sustainability Module
Route::prefix('sustainability')->name('sustainability.')->group(function () {
    Route::get('/commitment', [SustainabilityController::class, 'index'])->name('commitment');
    Route::get('/lingkungan', [SustainabilityController::class, 'lingkungan'])->name('lingkungan');
    Route::get('/csr', [SustainabilityController::class, 'csr'])->name('csr');
    Route::get('/k3', [SustainabilityController::class, 'k3'])->name('k3');
    Route::get('/esg', [SustainabilityController::class, 'esg'])->name('esg');
    Route::get('/gender', [SustainabilityController::class, 'gender'])->name('gender');
});

// 5. Biodiversity Dedicated Module
Route::prefix('biodiversity')->name('biodiversity.')->group(function () {
    Route::get('/', [BiodiversityController::class, 'index'])->name('index');
    Route::get('/info', [BiodiversityController::class, 'info'])->name('info');
    Route::get('/kehati-data', [BiodiversityController::class, 'kehatiData'])->name('kehati-data');
    Route::get('/kehati-indeks', [BiodiversityController::class, 'kehatiIndeks'])->name('kehati-indeks');
    Route::get('/program', [BiodiversityController::class, 'program'])->name('program');
    Route::get('/report', [BiodiversityController::class, 'report'])->name('report');
});

// 6. Media Module
Route::get('/news', [MediaController::class, 'newsIndex'])->name('news.index');
Route::get('/news/{slug}', [MediaController::class, 'newsShow'])->name('news.show');
Route::get('/gallery', [MediaController::class, 'galleryIndex'])->name('gallery');
Route::get('/videos', [MediaController::class, 'videoIndex'])->name('videos');

// 7. Download Center Information
Route::get('/downloads', [InformationController::class, 'downloadsIndex'])->name('downloads');

// 8. Contact Module
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

use App\Http\Controllers\Auth\AuthController;

// Auth Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// 9. Admin Dashboard Module (Protected)
Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // CMS Contents
    Route::get('/contents', [ContentController::class, 'index'])->name('contents');
    Route::post('/contents', [ContentController::class, 'update'])->name('contents.update');
    
    // Profile Management
    Route::get('/profile', [AdminDashboardController::class, 'profileIndex'])->name('profile');
    Route::post('/profile', [AdminDashboardController::class, 'updateProfile'])->name('profile.update');
    
    // Management / Leadership CRUD
    Route::get('/management', [AdminDashboardController::class, 'managementIndex'])->name('management');
    Route::post('/management', [AdminDashboardController::class, 'storeManagement'])->name('management.store');
    Route::delete('/management/{management}', [AdminDashboardController::class, 'deleteManagement'])->name('management.delete');

    // Hero Sliders CRUD
    Route::get('/sliders', [AdminDashboardController::class, 'slidersIndex'])->name('sliders');
    Route::post('/sliders', [AdminDashboardController::class, 'storeSlider'])->name('sliders.store');
    Route::post('/sliders/{slider}', [AdminDashboardController::class, 'updateSlider'])->name('sliders.update');
    Route::post('/sliders/{slider}/toggle', [AdminDashboardController::class, 'toggleSlider'])->name('sliders.toggle');
    Route::delete('/sliders/{slider}', [AdminDashboardController::class, 'deleteSlider'])->name('sliders.delete');

    // Facilities CRUD
    Route::get('/facilities', [AdminDashboardController::class, 'facilitiesIndex'])->name('facilities');
    Route::post('/facilities', [AdminDashboardController::class, 'storeFacility'])->name('facilities.store');
    Route::delete('/facilities/{facility}', [AdminDashboardController::class, 'deleteFacility'])->name('facilities.delete');

    // Awards CRUD
    Route::get('/awards', [AdminDashboardController::class, 'awardsIndex'])->name('awards');
    Route::post('/awards', [AdminDashboardController::class, 'storeAward'])->name('awards.store');
    Route::delete('/awards/{award}', [AdminDashboardController::class, 'deleteAward'])->name('awards.delete');

    // Operational Statistics CRUD
    Route::get('/statistics', [AdminDashboardController::class, 'statisticsIndex'])->name('statistics');
    Route::post('/statistics', [AdminDashboardController::class, 'storeStatistic'])->name('statistics.store');
    Route::post('/statistics/{statistic}', [AdminDashboardController::class, 'updateStatistic'])->name('statistics.update');
    Route::delete('/statistics/{statistic}', [AdminDashboardController::class, 'deleteStatistic'])->name('statistics.delete');

    // Biodiversity Species CRUD
    Route::get('/biodiversity', [AdminDashboardController::class, 'biodiversityIndex'])->name('biodiversity');
    Route::post('/biodiversity', [AdminDashboardController::class, 'storeSpecies'])->name('biodiversity.store');
    Route::delete('/biodiversity/{species}', [AdminDashboardController::class, 'deleteSpecies'])->name('biodiversity.delete');

    // Srikandi CRUD
    Route::get('/srikandi', [AdminDashboardController::class, 'srikandiIndex'])->name('srikandi');
    Route::post('/srikandi', [AdminDashboardController::class, 'storeSrikandi'])->name('srikandi.store');
    Route::delete('/srikandi/{srikandi}', [AdminDashboardController::class, 'deleteSrikandi'])->name('srikandi.delete');

    // News & Messages
    Route::get('/news', [AdminDashboardController::class, 'newsIndex'])->name('news');
    Route::post('/news', [AdminDashboardController::class, 'storeNews'])->name('news.store');
    Route::delete('/news/{news}', [AdminDashboardController::class, 'deleteNews'])->name('news.delete');
    
    // Gallery CRUD
    Route::get('/gallery', [AdminDashboardController::class, 'galleryIndex'])->name('gallery');
    Route::post('/gallery', [AdminDashboardController::class, 'storeGallery'])->name('gallery.store');
    Route::delete('/gallery/{gallery}', [AdminDashboardController::class, 'deleteGallery'])->name('gallery.delete');

    // Video CRUD
    Route::get('/videos', [AdminDashboardController::class, 'videoIndex'])->name('admin.videos');
    Route::post('/videos', [AdminDashboardController::class, 'storeVideo'])->name('admin.videos.store');
    Route::delete('/videos/{video}', [AdminDashboardController::class, 'deleteVideo'])->name('admin.videos.delete');

    // Document CRUD
    Route::get('/documents', [AdminDashboardController::class, 'documentIndex'])->name('admin.documents');
    Route::post('/documents', [AdminDashboardController::class, 'storeDocument'])->name('admin.documents.store');
    Route::delete('/documents/{document}', [AdminDashboardController::class, 'deleteDocument'])->name('admin.documents.delete');

    // Sustainability CRUD
    Route::get('/sustainability', [AdminDashboardController::class, 'sustainabilityIndex'])->name('admin.sustainability');
    Route::post('/sustainability', [AdminDashboardController::class, 'storeSustainability'])->name('admin.sustainability.store');
    Route::delete('/sustainability/{sustainability}', [AdminDashboardController::class, 'deleteSustainability'])->name('admin.sustainability.delete');

    // CSR CRUD
    Route::get('/csr', [AdminDashboardController::class, 'csrIndex'])->name('admin.csr');
    Route::post('/csr', [AdminDashboardController::class, 'storeCsr'])->name('admin.csr.store');
    Route::delete('/csr/{csr}', [AdminDashboardController::class, 'deleteCsr'])->name('admin.csr.delete');

    Route::get('/messages', [AdminDashboardController::class, 'messagesIndex'])->name('messages');
    Route::post('/messages/{message}/toggle', [AdminDashboardController::class, 'toggleMessageRead'])->name('messages.toggle');

    // Site Settings
    Route::get('/settings', [AdminDashboardController::class, 'settingsIndex'])->name('settings');
    Route::post('/settings', [AdminDashboardController::class, 'updateSettings'])->name('settings.update');
});
