<?php

declare(strict_types=1);

use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
use Rector\Config\RectorConfig;
use Rector\Laravel\Set\LaravelLevelSetList;
use Rector\PHPUnit\Set\PHPUnitLevelSetList;
use Rector\PHPUnit\Set\PHPUnitSetList;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Laravel\Set\LaravelSetList;
use Rector\Set\ValueObject\SetList;
use Rector\Symfony\Set\TwigSetList;

return static function (RectorConfig $rectorConfig): void {
    
    $rectorConfig->parallel(440,16,20);
    $rectorConfig->paths([__DIR__ . '/']);
    // $rectorConfig->disableParallel();
    $rectorConfig->skip([
        // single file
        __DIR__ . '/dist',
        // or directory
        __DIR__ . '/Resources'
        // or fnmatch
        // __DIR__ . '/src/*/Tests/*',

    ]);


    // register a single rule
    $rectorConfig->rule(InlineConstructorDefaultToPropertyRector::class);

    $rectorConfig->sets([
        LaravelLevelSetList::UP_TO_LARAVEL_80,
        LaravelSetList::LARAVEL_80,
        PHPUnitSetList::PHPUNIT_80,
        PHPUnitLevelSetList::UP_TO_PHPUNIT_80,
        SetList::PHP_74,
        LevelSetList::UP_TO_PHP_74,
        TwigSetList::TWIG_240,
        // SetList::EARLY_RETURN,
        SetList::MONOLOG_20,
        SetList::DEAD_CODE,
    ]);
};